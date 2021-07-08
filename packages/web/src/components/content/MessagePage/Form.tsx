import { FC } from "react";
import { Formik, Field, Form } from "formik";
import {
	FormControl,
	Button,
	FormLabel,
	Input,
	Textarea,
	FormErrorMessage,
	Heading,
	Box,
	chakra,
	ChakraProps,
	useToast,
} from "@chakra-ui/react";
import Twemoji from "@/comp/utils/Twemoji";
import { API_ROUTE } from "@/conf/globals";
import { Capitalize, validationSchema } from "./FormValidation";

const ChakraForm = chakra(Form);

const FormUI: FC<ChakraProps> = (props) => {
	const toast = useToast();

	return (
		<Formik
			initialValues={{ name: "", content: "", attachment: "" }}
			validationSchema={validationSchema}
			onSubmit={async (data, { setSubmitting }) => {
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
					try {
						const json = await res.json();

						return toast({
							title: "Failed to send the message.",
							description: json.message,
							position: "bottom-right",
							duration: 3000,
							status: "error",
						});
					} catch (e) {
						return toast({
							title: "Failed to send the message.",
							description: "An unknown error occured.",
							position: "bottom-right",
							duration: 3000,
							status: "error",
						});
					}
				}

				const json = await res.json();

				toast({
					title: json.message,

					position: "bottom-right",
					duration: 3000,
					status: "success",
				});

				setSubmitting(false);
			}}
		>
			{({ isValid, isSubmitting, errors }) => (
				<Box background="gray.900" padding={6} minWidth={300} width={400} borderRadius={10} boxShadow="md">
					<ChakraForm autoComplete="off" display="flex" flexDirection="column" alignItems="center" {...props}>
						<Heading fontSize="3xl">
							Message me! <Twemoji emoji="💬" />
						</Heading>
						<FormControl mt={4} width="100%" isInvalid={!!errors.name}>
							<FormLabel htmlFor="name" fontSize="lg">
								Name:
							</FormLabel>
							<Field name="name" type="input" as={Input} background="gray.900" />
							<FormErrorMessage>{Capitalize(errors.name)}</FormErrorMessage>
						</FormControl>

						<FormControl mt={4} width="100%" isInvalid={!!errors.content}>
							<FormLabel htmlFor="content" fontSize="lg">
								Content:
							</FormLabel>
							<Field name="content" as={Textarea} background="gray.900" rows={4} resize="none" />
							<FormErrorMessage>{Capitalize(errors.content)}</FormErrorMessage>
						</FormControl>

						<FormControl mt={4} width="100%" isInvalid={!!errors.attachment}>
							<FormLabel htmlFor="content" fontSize="lg">
								Attachment url:
							</FormLabel>
							<Field name="attachment" type="input" as={Input} background="gray.900" />
							<FormErrorMessage>{Capitalize(errors.attachment)}</FormErrorMessage>
						</FormControl>

						<Button
							mt={4}
							isLoading={isSubmitting}
							disabled={!isValid}
							type="submit"
							_hover={{
								boxShadow: "md",
							}}
						>
							Submit
						</Button>
					</ChakraForm>
				</Box>
			)}
		</Formik>
	);
};
export default FormUI;
