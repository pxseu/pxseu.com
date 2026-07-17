"use client";

import { type SubmitEvent, useId, useReducer, useRef } from "react";
import { FaCheck, FaCircleNotch, FaTriangleExclamation } from "react-icons/fa6";
import { API_ROUTE } from "@/config";

type ErrorField = "content" | "attachment";

type FormState = {
	content: string;
	attachment: string;
	name: string;
	status: "idle" | "loading" | "success" | "error";
	errorMessage: string;
	errorField: ErrorField | null;
};

type FormAction =
	| { type: "SET_CONTENT"; payload: string }
	| { type: "SET_ATTACHMENT"; payload: string }
	| { type: "SET_NAME"; payload: string }
	| { type: "FIELD_ERROR"; field: ErrorField; message: string }
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
	errorField: null,
};

const CONTENT_REQUIRED_ERROR = "Add a message or attachment before sending.";
const ATTACHMENT_URL_ERROR = "That attachment URL doesn't look valid.";

function isValidUrl(value: string) {
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}

const clearFieldError = (state: FormState, field: ErrorField): FormState =>
	state.errorField === field ? { ...state, status: "idle", errorField: null, errorMessage: "" } : state;

function formReducer(state: FormState, action: FormAction): FormState {
	switch (action.type) {
		case "SET_CONTENT":
			return clearFieldError({ ...state, content: action.payload }, "content");
		case "SET_ATTACHMENT":
			return clearFieldError({ ...state, attachment: action.payload }, "attachment");
		case "SET_NAME":
			return { ...state, name: action.payload };
		case "FIELD_ERROR":
			return {
				...state,
				status: "error",
				errorField: action.field,
				errorMessage: action.message,
			};
		case "RESET_FORM":
			return initialState;
		case "SUBMIT_START":
			return {
				...state,
				status: "loading",
				errorMessage: "",
				errorField: null,
			};
		case "SUBMIT_SUCCESS":
			return { ...initialState, status: "success" };
		case "SUBMIT_ERROR":
			return {
				...state,
				status: "error",
				errorMessage: action.payload,
				errorField: null,
			};
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
	const attachmentInputRef = useRef<HTMLInputElement>(null);
	const [state, dispatch] = useReducer(formReducer, initialState);
	const { content, attachment, name, status, errorMessage, errorField } = state;
	const showSubmitError = status === "error" && errorField === null;

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		const trimmedContent = content.trim();
		const trimmedAttachment = attachment.trim();

		if (!trimmedContent && !trimmedAttachment) {
			dispatch({
				type: "FIELD_ERROR",
				field: "content",
				message: CONTENT_REQUIRED_ERROR,
			});
			contentInputRef.current?.focus();
			return;
		}

		if (trimmedAttachment && !isValidUrl(trimmedAttachment)) {
			dispatch({
				type: "FIELD_ERROR",
				field: "attachment",
				message: ATTACHMENT_URL_ERROR,
			});
			attachmentInputRef.current?.focus();
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
					name: name.trim() || undefined,
				}),
			});

			if (!response.ok) {
				throw new Error("Couldn't send that message. Try again in a moment.");
			}

			dispatch({ type: "SUBMIT_SUCCESS" });
		} catch (error) {
			dispatch({
				type: "SUBMIT_ERROR",
				payload: error instanceof Error ? error.message : "Something went wrong.",
			});
		}
	};

	return (
		<div className="w-full">
			{status === "success" ? (
				<output
					className="mb-5 flex items-center border border-border-100 bg-green-900/20 p-3 text-green-300"
					aria-live="polite"
				>
					<FaCheck aria-hidden="true" className="mr-2 h-4 w-4" />
					Sent. Thanks =]
				</output>
			) : showSubmitError ? (
				<div
					className="mb-5 flex items-center border border-border-100 bg-red-900/20 p-3 text-red-300"
					role="alert"
					aria-live="polite"
				>
					<FaTriangleExclamation aria-hidden="true" className="mr-2 h-4 w-4" />
					{errorMessage || "Something went wrong."}
				</div>
			) : null}

			<form onSubmit={handleSubmit} noValidate className="space-y-5">
				<div className="space-y-2">
					<label htmlFor={nameInputId} className="block text-xs uppercase tracking-[0.18em] text-zinc-400">
						Name
					</label>
					<input
						id={nameInputId}
						name="name"
						type="text"
						autoComplete="name"
						value={name}
						onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
						className={inputClass}
						placeholder="Anonymous"
						disabled={status === "loading"}
					/>
				</div>

				<div className="space-y-2">
					<label htmlFor={contentInputId} className="block text-xs uppercase tracking-[0.18em] text-zinc-400">
						Message
					</label>
					<textarea
						ref={contentInputRef}
						id={contentInputId}
						name="content"
						autoComplete="off"
						value={content}
						onChange={(e) => dispatch({ type: "SET_CONTENT", payload: e.target.value })}
						className={inputClass}
						rows={4}
						aria-invalid={errorField === "content" || undefined}
						aria-describedby={errorField === "content" ? contentErrorId : undefined}
						placeholder="Write something…"
						disabled={status === "loading"}
					/>
					{errorField === "content" ? (
						<p id={contentErrorId} className="text-xs text-red-300">
							{errorMessage}
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
						ref={attachmentInputRef}
						id={attachmentInputId}
						name="attachment"
						type="url"
						autoComplete="off"
						value={attachment}
						onChange={(e) => dispatch({ type: "SET_ATTACHMENT", payload: e.target.value })}
						className={inputClass}
						aria-invalid={errorField === "attachment" || undefined}
						aria-describedby={errorField === "attachment" ? attachmentErrorId : undefined}
						placeholder="https://example.com/image.png"
						disabled={status === "loading"}
					/>
					{errorField === "attachment" ? (
						<p id={attachmentErrorId} className="text-xs text-red-300">
							{errorMessage}
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
								<FaCircleNotch aria-hidden="true" className="-ml-1 mr-2 h-4 w-4 animate-spin" />
								Sending…
							</span>
						) : (
							"Send"
						)}
					</button>

					<button
						type="button"
						onClick={() => dispatch({ type: "RESET_FORM" })}
						disabled={status === "loading"}
						className="border border-border-100 bg-zinc-900 px-4 py-3 text-xs uppercase tracking-[0.2em] text-zinc-300 transition-[border-color,background-color,color,opacity] duration-150 ease-linear hover:border-zinc-600 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Clear
					</button>
				</div>
			</form>
		</div>
	);
}
