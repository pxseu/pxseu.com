"use client";

import { type FormEvent, useId, useReducer, useRef } from "react";
import { FaCheck, FaCircleNotch, FaTriangleExclamation } from "react-icons/fa6";
import { API_ROUTE } from "@/config";

type ErrorField = "content" | "attachment";

interface FormState {
	content: string;
	attachment: string;
	name: string;
	status: "idle" | "loading" | "success" | "error";
	errorMessage: string;
	errorField: ErrorField | null;
}

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

function isValidUrl(value: string): boolean {
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}

function clearFeedback(state: FormState, field?: ErrorField): FormState {
	if (state.status === "success" || (state.status === "error" && (!state.errorField || state.errorField === field))) {
		return { ...state, status: "idle", errorField: null, errorMessage: "" };
	}

	return state;
}

function formReducer(state: FormState, action: FormAction): FormState {
	switch (action.type) {
		case "SET_CONTENT":
			return clearFeedback({ ...state, content: action.payload }, "content");
		case "SET_ATTACHMENT":
			return clearFeedback({ ...state, attachment: action.payload }, "attachment");
		case "SET_NAME":
			return clearFeedback({ ...state, name: action.payload });
		case "FIELD_ERROR":
			return { ...state, status: "error", errorField: action.field, errorMessage: action.message };
		case "RESET_FORM":
			return initialState;
		case "SUBMIT_START":
			return { ...state, status: "loading", errorMessage: "", errorField: null };
		case "SUBMIT_SUCCESS":
			return { ...initialState, status: "success" };
		case "SUBMIT_ERROR":
			return { ...state, status: "error", errorMessage: action.payload, errorField: null };
	}
}

const fieldClassName =
	"w-full border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-700 transition-colors hover:border-zinc-700 focus:border-brand-500/70 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-60";

const labelClassName = "text-xs font-bold uppercase tracking-widest text-zinc-500";

export function MessageForm() {
	const nameInputId = useId();
	const contentInputId = useId();
	const contentErrorId = useId();
	const attachmentInputId = useId();
	const attachmentErrorId = useId();
	const contentInputRef = useRef<HTMLTextAreaElement>(null);
	const attachmentInputRef = useRef<HTMLInputElement>(null);
	const [state, dispatch] = useReducer(formReducer, initialState);
	const { content, attachment, name, status, errorMessage, errorField } = state;
	const loading = status === "loading";
	const submitError = status === "error" && errorField === null;

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const trimmedContent = content.trim();
		const trimmedAttachment = attachment.trim();

		if (!trimmedContent && !trimmedAttachment) {
			dispatch({ type: "FIELD_ERROR", field: "content", message: CONTENT_REQUIRED_ERROR });
			contentInputRef.current?.focus();
			return;
		}

		if (trimmedAttachment && !isValidUrl(trimmedAttachment)) {
			dispatch({ type: "FIELD_ERROR", field: "attachment", message: ATTACHMENT_URL_ERROR });
			attachmentInputRef.current?.focus();
			return;
		}

		dispatch({ type: "SUBMIT_START" });

		try {
			const response = await fetch(`${API_ROUTE}/v2/message`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					content: trimmedContent || undefined,
					attachment: trimmedAttachment || undefined,
					name: name.trim() || undefined,
				}),
			});

			if (!response.ok) throw new Error("Couldn't send that message. Try again in a moment.");

			dispatch({ type: "SUBMIT_SUCCESS" });
		} catch (error) {
			dispatch({
				type: "SUBMIT_ERROR",
				payload: error instanceof Error ? error.message : "Something went wrong.",
			});
		}
	}

	return (
		<div data-stagger>
			<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" data-stagger>
				<div className="flex flex-col gap-2">
					<label htmlFor={nameInputId} className={labelClassName}>
						Name <span className="normal-case tracking-normal text-zinc-700">(optional)</span>
					</label>
					<input
						id={nameInputId}
						name="name"
						type="text"
						autoComplete="name"
						value={name}
						onChange={(event) => dispatch({ type: "SET_NAME", payload: event.target.value })}
						className={fieldClassName}
						placeholder="Anonymous"
						disabled={loading}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor={contentInputId} className={labelClassName}>
						Message
					</label>
					<textarea
						ref={contentInputRef}
						id={contentInputId}
						name="content"
						value={content}
						onChange={(event) => dispatch({ type: "SET_CONTENT", payload: event.target.value })}
						className={fieldClassName}
						rows={5}
						aria-invalid={errorField === "content" || undefined}
						aria-describedby={errorField === "content" ? contentErrorId : undefined}
						placeholder="Write something…"
						disabled={loading}
					/>
					{errorField === "content" ? (
						<p id={contentErrorId} className="text-xs text-red-300">
							{errorMessage}
						</p>
					) : null}
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor={attachmentInputId} className={labelClassName}>
						Attachment URL <span className="normal-case tracking-normal text-zinc-700">(optional)</span>
					</label>
					<input
						ref={attachmentInputRef}
						id={attachmentInputId}
						name="attachment"
						type="url"
						value={attachment}
						onChange={(event) => dispatch({ type: "SET_ATTACHMENT", payload: event.target.value })}
						className={fieldClassName}
						aria-invalid={errorField === "attachment" || undefined}
						aria-describedby={errorField === "attachment" ? attachmentErrorId : undefined}
						placeholder="https://example.com/image.png"
						disabled={loading}
					/>
					{errorField === "attachment" ? (
						<p id={attachmentErrorId} className="text-xs text-red-300">
							{errorMessage}
						</p>
					) : null}
				</div>

				<div className="flex gap-3 pt-1">
					<button
						type="submit"
						disabled={loading}
						className="inline-flex min-w-28 items-center justify-center bg-brand-500/70 px-4 py-2.5 text-sm font-bold text-zinc-950 transition-colors hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{loading ? (
							<span className="inline-flex items-center gap-2">
								<FaCircleNotch aria-hidden="true" className="size-3.5 animate-spin" />
								Sending…
							</span>
						) : (
							"Send"
						)}
					</button>

					<button
						type="button"
						onClick={() => dispatch({ type: "RESET_FORM" })}
						disabled={loading}
						className="px-4 py-2.5 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Clear
					</button>
				</div>
			</form>

			<div className="mt-3 min-h-12" aria-live="polite" aria-atomic="true" data-stagger>
				{status === "success" ? (
					<output className="flex min-h-12 items-center gap-3 border-l-2 border-green-400/70 bg-green-950/25 px-4 py-2.5 text-sm text-green-200">
						<span
							aria-hidden="true"
							className="grid size-6 shrink-0 place-items-center bg-green-400/10 text-green-300"
						>
							<FaCheck className="size-3" />
						</span>
						<span>
							<strong className="font-semibold text-green-100">Message sent.</strong> Thanks =]
						</span>
					</output>
				) : submitError ? (
					<div
						className="flex min-h-12 items-center gap-3 border-l-2 border-red-400/70 bg-red-950/25 px-4 py-2.5 text-sm text-red-200"
						role="alert"
					>
						<span
							aria-hidden="true"
							className="grid size-6 shrink-0 place-items-center bg-red-400/10 text-red-300"
						>
							<FaTriangleExclamation className="size-3" />
						</span>
						<span>{errorMessage || "Something went wrong."}</span>
					</div>
				) : null}
			</div>
		</div>
	);
}
