import React, { FC } from "react";
import { Formik, Field, Form } from "formik";
import {
	FormControl,
	Button,
	FormLabel,
	Input,
	Textarea,
	FormErrorMessage,
	Heading,
	chakra,
	ChakraProps,
	useToast,
	Flex,
	Box,
} from "@chakra-ui/react";
import Twemoji from "@/comp/utils/Twemoji";
import { API_ROUTE } from "@/conf/globals";
import { Capitalize, validationSchema } from "./FormValidation";
import PersistUsername from "./RestoreUsername";

const ChakraForm = chakra(Form);
const USERNAME_STORAGE_KEY = "pxseu.com:v1:message:username";

const FormUI: FC<ChakraProps> = (props) => {
	const toast = useToast();

	return (
		<Formik
			initialValues={{ name: "", content: "", attachment: "" }}
			validationSchema={validationSchema}
			onSubmit={async (data, { setSubmitting, resetForm, setFieldValue }) => {
				setSubmitting(true);

				const res = await fetch(`${API_ROUTE}/v2/sendMessage`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: data.name,
						message: data.content,
						attachment: data.attachment,
					}),
				});

				if (!res.ok) {
					let error = "An unknown error occured.";

					try {
						const json = await res.json();

						if (json.message) error = json.message;
					} catch (e) {
						/* */
					}

					return toast({
						title: "Failed to send the message.",
						description: error,
						position: "bottom-right",
						duration: 3000,
						status: "error",
					});
				}

				localStorage.setItem(USERNAME_STORAGE_KEY, data.name);

				const json = await res.json();

				toast({
					title: json.message,

					position: "bottom-right",
					duration: 3000,
					status: "success",
				});

				resetForm();

				const savedUserName = localStorage.getItem(USERNAME_STORAGE_KEY) ?? "";
				setFieldValue("name", savedUserName);

				setSubmitting(false);
			}}
		>
			{({ isValid, isSubmitting, errors, resetForm }) => (
				<Box
					background="gray.900"
					padding={6}
					borderRadius={10}
					boxShadow="md"
					maxWidth="450px"
					minWidth="200px"
					flexGrow={1}
				>
					<ChakraForm autoComplete="off" display="flex" flexDirection="column" alignItems="center" {...props}>
						<Heading fontSize="3xl">
							Message me! <Twemoji emoji="💬" />
						</Heading>
						<FormControl mt={4} isInvalid={!!errors.name}>
							<FormLabel htmlFor="name" fontSize="lg">
								Name:
							</FormLabel>
							<Field name="name" type="input" as={Input} background="gray.900" disabled={isSubmitting} />

							<FormErrorMessage>{Capitalize(errors.name)}</FormErrorMessage>
						</FormControl>
						<PersistUsername />

						<FormControl mt={4} isInvalid={!!errors.content}>
							<FormLabel htmlFor="content" fontSize="lg">
								Content:
							</FormLabel>
							<Field
								name="content"
								as={Textarea}
								background="gray.900"
								rows={4}
								resize="none"
								disabled={isSubmitting}
							/>
							<FormErrorMessage>{Capitalize(errors.content)}</FormErrorMessage>
						</FormControl>

						<FormControl mt={4} isInvalid={!!errors.attachment}>
							<FormLabel htmlFor="content" fontSize="lg">
								Attachment url:
							</FormLabel>
							<Field
								name="attachment"
								type="input"
								as={Input}
								background="gray.900"
								disabled={isSubmitting}
							/>
							<FormErrorMessage>{Capitalize(errors.attachment)}</FormErrorMessage>
						</FormControl>

						<Flex width="100%" flexDirection="row" justifyContent="space-between">
							<Button
								mt={4}
								isLoading={isSubmitting}
								disabled={!isValid || isSubmitting}
								type="submit"
								_hover={{
									boxShadow: "md",
								}}
							>
								Submit
							</Button>
							<Button
								variant="ghost"
								mt={4}
								type="button"
								disabled={isSubmitting}
								onClick={() => resetForm()}
							>
								Reset
							</Button>
						</Flex>
					</ChakraForm>
				</Box>
			)}
		</Formik>
	);
};
export default FormUI;
