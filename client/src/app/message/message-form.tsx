"use client";

import { type SubmitEvent, useId, useReducer, useRef } from "react";
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

const CONTENT_REQUIRED_ERROR =
	"Enter a message or attachment URL before sending.";
const ATTACHMENT_URL_ERROR = "Enter a valid attachment URL.";

function isValidUrl(value: string) {
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}

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

const inputClass =
	"w-full border border-border-100 bg-zinc-950 p-3 text-sm text-zinc-300 placeholder:text-zinc-600 transition-colors duration-150 ease-linear focus:border-brand-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50";

export default function MessageForm() {
	const nameInputId = useId();
	const contentInputId = useId();
	const contentErrorId = useId();
	const attachmentInputId = useId();
	const attachmentErrorId = useId();
	const contentInputRef = useRef<HTMLTextAreaElement>(null);
	const [state, dispatch] = useReducer(formReducer, initialState);
	const { content, attachment, name, status, errorMessage } = state;
	const hasContentError = errorMessage === CONTENT_REQUIRED_ERROR;
	const hasAttachmentError = errorMessage === ATTACHMENT_URL_ERROR;

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		const trimmedContent = content.trim();
		const trimmedAttachment = attachment.trim();

		if (!trimmedContent && !trimmedAttachment) {
			dispatch({ type: "SET_ERROR", payload: CONTENT_REQUIRED_ERROR });
			contentInputRef.current?.focus();
			return;
		}

		if (trimmedAttachment && !isValidUrl(trimmedAttachment)) {
			dispatch({ type: "SET_ERROR", payload: ATTACHMENT_URL_ERROR });
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
					content: trimmedContent || undefined,
					attachment: trimmedAttachment || undefined,
					name: name || undefined,
				}),
			});

			if (!response.ok) {
				throw new Error("Message couldn't be sent. Try again in a moment.");
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
		<div className="w-full">
			{status === "success" ? (
				<div
					className="mx-5 mt-5 flex items-center border border-border-100 bg-green-900/20 p-3 text-green-300 sm:mx-6"
					role="status"
					aria-live="polite"
				>
					<FaCheck aria-hidden="true" className="mr-2 h-4 w-4" />
					Message sent.
				</div>
			) : status === "error" && !hasContentError && !hasAttachmentError ? (
				<div
					className="mx-5 mt-5 flex items-center border border-border-100 bg-red-900/20 p-3 text-red-300 sm:mx-6"
					role="alert"
					aria-live="polite"
				>
					<FaTriangleExclamation aria-hidden="true" className="mr-2 h-4 w-4" />
					{errorMessage || "Failed to send message"}
				</div>
			) : null}

			<form
				onSubmit={handleSubmit}
				noValidate
				className="space-y-5 px-5 py-5 sm:px-6 sm:py-6"
			>
				<div className="space-y-2">
					<label
						htmlFor={nameInputId}
						className="block text-xs uppercase tracking-[0.18em] text-zinc-400"
					>
						Name
					</label>
					<input
						id={nameInputId}
						name="name"
						type="text"
						autoComplete="name"
						value={name}
						onChange={(e) =>
							dispatch({ type: "SET_NAME", payload: e.target.value })
						}
						className={inputClass}
						placeholder="Anonymous"
						disabled={status === "loading"}
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor={contentInputId}
						className="block text-xs uppercase tracking-[0.18em] text-zinc-400"
					>
						Message
					</label>
					<textarea
						ref={contentInputRef}
						id={contentInputId}
						name="content"
						autoComplete="off"
						value={content}
						onChange={(e) =>
							dispatch({ type: "SET_CONTENT", payload: e.target.value })
						}
						className={inputClass}
						rows={4}
						aria-invalid={hasContentError || undefined}
						aria-describedby={hasContentError ? contentErrorId : undefined}
						placeholder="Your message…"
						disabled={status === "loading"}
					/>
					{hasContentError ? (
						<p id={contentErrorId} className="text-xs text-red-300">
							{CONTENT_REQUIRED_ERROR}
						</p>
					) : null}
				</div>

				<div className="space-y-2">
					<label
						htmlFor={attachmentInputId}
						className="block text-xs uppercase tracking-[0.18em] text-zinc-400"
					>
						Attachment URL
					</label>
					<input
						id={attachmentInputId}
						name="attachment"
						type="url"
						autoComplete="off"
						value={attachment}
						onChange={(e) =>
							dispatch({ type: "SET_ATTACHMENT", payload: e.target.value })
						}
						className={inputClass}
						aria-invalid={hasAttachmentError || undefined}
						aria-describedby={
							hasAttachmentError ? attachmentErrorId : undefined
						}
						placeholder="https://example.com/image.png"
						disabled={status === "loading"}
					/>
					{hasAttachmentError ? (
						<p id={attachmentErrorId} className="text-xs text-red-300">
							{ATTACHMENT_URL_ERROR}
						</p>
					) : null}
				</div>

				<div className="grid gap-3 pt-2 sm:grid-cols-2">
					<button
						type="submit"
						disabled={status === "loading"}
						className="border border-brand-500 bg-brand-500/80 px-4 py-3 text-xs uppercase tracking-[0.2em] text-zinc-950 transition-[background-color,color,opacity] duration-150 ease-linear hover:bg-brand-500 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{status === "loading" ? (
							<span className="flex items-center justify-center">
								<FaCircleNotch
									aria-hidden="true"
									className="-ml-1 mr-2 h-4 w-4 animate-spin"
								/>
								Sending…
							</span>
						) : (
							"Send"
						)}
					</button>

					<button
						type="button"
						onClick={() => dispatch({ type: "RESET_FORM" })}
						className="border border-border-100 bg-zinc-900 px-4 py-3 text-xs uppercase tracking-[0.2em] text-zinc-300 transition-[border-color,background-color,color] duration-150 ease-linear hover:border-zinc-600 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
					>
						Reset
					</button>
				</div>
			</form>
		</div>
	);
}
