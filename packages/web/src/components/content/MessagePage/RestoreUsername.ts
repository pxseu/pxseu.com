import { useFormikContext } from "formik";
import { useEffect } from "react";

const USERNAME_STORAGE_KEY = "pxseu.com:v1:message:username";

const PersistUsername = () => {
	const { setFieldValue } = useFormikContext();

	useEffect(() => {
		const savedUserName = localStorage.getItem(USERNAME_STORAGE_KEY) ?? "";
		if (!savedUserName) localStorage.setItem(USERNAME_STORAGE_KEY, "");
		setFieldValue("name", savedUserName, true);
	}, [setFieldValue]);

	return null;
};

export default PersistUsername;
