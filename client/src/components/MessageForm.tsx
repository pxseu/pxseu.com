"use client";

import { FormEvent, useReducer } from "react";
import { API_ROUTE } from "@/config";

type FormState = {
	content: string;
	attachment: string;
	name: string;
	status: "idle" | "loading" | "success" | "error";
	errorMessage: string;
};

type FormAction =
	| { type: "SET_CONTENT"; payload: string }
	| { type: "SET_ATTACHMENT"; payload: string }
	| { type: "SET_NAME"; payload: string }
	| { type: "SET_STATUS"; payload: FormState["status"] }
	| { type: "SET_ERROR"; payload: string }
	| { type: "RESET_FORM" }
	| { type: "SUBMIT_START" }
	| { type: "SUBMIT_SUCCESS" }
	| { type: "SUBMIT_ERROR"; payload: string };

const initialState: FormState = {
	content: "",
	attachment: "",
	name: "",
	status: "idle",
	errorMessage: "",
};

function formReducer(state: FormState, action: FormAction): FormState {
	switch (action.type) {
		case "SET_CONTENT":
			return { ...state, content: action.payload };
		case "SET_ATTACHMENT":
			return { ...state, attachment: action.payload };
		case "SET_NAME":
			return { ...state, name: action.payload };
		case "SET_STATUS":
			return { ...state, status: action.payload };
		case "SET_ERROR":
			return { ...state, errorMessage: action.payload, status: "error" };
		case "RESET_FORM":
			return initialState;
		case "SUBMIT_START":
			return { ...state, status: "loading", errorMessage: "" };
		case "SUBMIT_SUCCESS":
			return { ...initialState, status: "success" };
		case "SUBMIT_ERROR":
			return { ...state, status: "error", errorMessage: action.payload };
		default:
			return state;
	}
}

export default function MessageForm() {
	const [state, dispatch] = useReducer(formReducer, initialState);
	const { content, attachment, name, status, errorMessage } = state;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!content.trim()) {
			dispatch({ type: "SET_ERROR", payload: "Message content is required" });
			return;
		}

		dispatch({ type: "SUBMIT_START" });

		try {
			const response = await fetch(`${API_ROUTE}/v2/message`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content,
					attachment: attachment || undefined,
					name: name || undefined,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to send message");
			}

			dispatch({ type: "SUBMIT_SUCCESS" });
		} catch (error) {
			dispatch({
				type: "SUBMIT_ERROR",
				payload: error instanceof Error ? error.message : "Something went wrong",
			});
		}
	};

	return (
		<div className="w-full max-w-md border-[0.5px] border-solid border-border-100 p-8">
			<h2 className="text-3xl font-bold mb-6 text-zinc-300">Message me</h2>

			{status === "success" && (
				<div className="mb-6 p-3 bg-green-800/20 border border-zinc-700 text-green-300 flex items-center">
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
					Message sent successfully!
				</div>
			)}

			{status === "error" && (
				<div className="mb-6 p-3 bg-red-800/20 border border-zinc-700 text-red-300 flex items-center">
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{errorMessage || "Failed to send message"}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-5">
				<div className="space-y-2">
					<label htmlFor="name" className="block text-zinc-300">
						Name:
					</label>
					<input
						id="name"
						type="text"
						value={name}
						onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
						className="w-full p-3 bg-transparent border border-zinc-700 focus:border-zinc-500 focus:outline-hidden"
						placeholder="Anonymous"
					/>
				</div>

				<div className="space-y-2">
					<label htmlFor="content" className="block text-zinc-300">
						Content:
					</label>
					<textarea
						id="content"
						value={content}
						onChange={(e) => dispatch({ type: "SET_CONTENT", payload: e.target.value })}
						className="w-full p-3 bg-transparent border border-zinc-700 focus:border-zinc-500 focus:outline-hidden"
						rows={4}
						required
					/>
				</div>

				<div className="space-y-2">
					<label htmlFor="attachment" className="block text-zinc-300">
						Attachment url:
					</label>
					<input
						id="attachment"
						type="url"
						value={attachment}
						onChange={(e) => dispatch({ type: "SET_ATTACHMENT", payload: e.target.value })}
						className="w-full p-3 bg-transparent border border-zinc-700 focus:border-zinc-500 focus:outline-hidden"
						placeholder="https://example.com/image.png"
					/>
				</div>

				<div className="flex justify-between gap-4 pt-2">
					<button
						type="submit"
						disabled={status === "loading"}
						className="py-2 px-4 bg-brand-500 hover:bg-brand-400 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-1/2"
					>
						{status === "loading" ? (
							<span className="flex items-center justify-center">
								<svg
									className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Sending...
							</span>
						) : (
							"Submit"
						)}
					</button>

					<button
						type="button"
						onClick={() => dispatch({ type: "RESET_FORM" })}
						className="py-2 px-4 bg-zinc-700 hover:bg-zinc-600 text-white transition-all duration-200 w-1/2"
					>
						Reset
					</button>
				</div>
			</form>
		</div>
	);
}
