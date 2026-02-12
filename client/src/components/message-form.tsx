"use client";

import { type SubmitEvent, useId, useReducer } from "react";
import { FaCheck, FaCircleNotch, FaTriangleExclamation } from "react-icons/fa6";
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
	const nameInputId = useId();
	const contentInputId = useId();
	const attachmentInputId = useId();
	const [state, dispatch] = useReducer(formReducer, initialState);
	const { content, attachment, name, status, errorMessage } = state;

	const handleSubmit = async (e: SubmitEvent) => {
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
				payload:
					error instanceof Error ? error.message : "Something went wrong",
			});
		}
	};

	return (
		<div className="w-full max-w-2xl border border-border-100 bg-zinc-950/50">
			<div className="border-b border-border-100 px-5 py-4 sm:px-6">
				<p className="mb-2 text-[11px] tracking-[0.2em] uppercase text-zinc-500">
					Direct Message
				</p>
				<h2 className="text-2xl font-semibold uppercase tracking-[0.04em] text-zinc-200 sm:text-3xl">
					Send a Message
				</h2>
			</div>

			{status === "success" && (
				<div className="mx-5 mt-5 flex items-center border border-border-100 bg-green-900/20 p-3 text-green-300 sm:mx-6">
					<FaCheck role="img" aria-label="Check" className="mr-2 h-5 w-5" />
					Message sent.
				</div>
			)}

			{status === "error" && (
				<div className="mx-5 mt-5 flex items-center border border-border-100 bg-red-900/20 p-3 text-red-300 sm:mx-6">
					<FaTriangleExclamation
						role="img"
						aria-label="Error"
						className="mr-2 h-5 w-5"
					/>
					{errorMessage || "Failed to send message"}
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				className="space-y-5 px-5 py-5 sm:px-6 sm:py-6"
			>
				<div className="space-y-2">
					<label
						htmlFor={nameInputId}
						className="block text-xs uppercase tracking-[0.18em] text-zinc-500"
					>
						Name
					</label>
					<input
						id={nameInputId}
						type="text"
						value={name}
						onChange={(e) =>
							dispatch({ type: "SET_NAME", payload: e.target.value })
						}
						className="w-full border border-border-100 bg-zinc-950 p-3 text-sm text-zinc-300 placeholder:text-zinc-600 transition-colors duration-150 ease-linear focus:border-brand-500/50 focus:outline-none"
						placeholder="Anonymous"
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor={contentInputId}
						className="block text-xs uppercase tracking-[0.18em] text-zinc-500"
					>
						Message
					</label>
					<textarea
						id={contentInputId}
						value={content}
						onChange={(e) =>
							dispatch({ type: "SET_CONTENT", payload: e.target.value })
						}
						className="w-full border border-border-100 bg-zinc-950 p-3 text-sm text-zinc-300 placeholder:text-zinc-600 transition-colors duration-150 ease-linear focus:border-brand-500/50 focus:outline-none"
						rows={4}
						required
						placeholder="Your message..."
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor={attachmentInputId}
						className="block text-xs uppercase tracking-[0.18em] text-zinc-500"
					>
						Attachment URL
					</label>
					<input
						id={attachmentInputId}
						type="url"
						value={attachment}
						onChange={(e) =>
							dispatch({ type: "SET_ATTACHMENT", payload: e.target.value })
						}
						className="w-full border border-border-100 bg-zinc-950 p-3 text-sm text-zinc-300 placeholder:text-zinc-600 transition-colors duration-150 ease-linear focus:border-brand-500/50 focus:outline-none"
						placeholder="https://example.com/image.png"
					/>
				</div>

				<div className="grid gap-3 pt-2 sm:grid-cols-2">
					<button
						type="submit"
						disabled={status === "loading"}
						className="border border-brand-500 bg-brand-500/80 px-4 py-3 text-xs uppercase tracking-[0.2em] text-zinc-950 transition-all duration-150 ease-linear hover:bg-brand-500 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{status === "loading" ? (
							<span className="flex items-center justify-center">
								<FaCircleNotch
									role="img"
									aria-label="Loading"
									className="-ml-1 mr-2 h-4 w-4 animate-spin"
								/>
								Sending...
							</span>
						) : (
							"Send"
						)}
					</button>

					<button
						type="button"
						onClick={() => dispatch({ type: "RESET_FORM" })}
						className="border border-border-100 bg-zinc-900 px-4 py-3 text-xs uppercase tracking-[0.2em] text-zinc-300 transition-all duration-150 ease-linear hover:border-zinc-600 hover:bg-zinc-800"
					>
						Reset
					</button>
				</div>
			</form>
		</div>
	);
}
