import Layout from "@/comp/layout";
import React, { FC } from "react";
import { Formik, Field } from "formik";
import { Input } from "@chakra-ui/react";

const Home: FC = () => (
	<Layout display="flex" flexDirection="column" alignItems="center">
		<Formik
			initialValues={{ name: "", content: "", attachment: "" }}
			onSubmit={(data, { setSubmitting }) => {
				setSubmitting(true);

				// stuff

				setSubmitting(false);
			}}
		>
            <Field></Field>
			{/* <Field name="name" type="input" as={<Input />} /> */}
		</Formik>
	</Layout>
);

export default Home;
