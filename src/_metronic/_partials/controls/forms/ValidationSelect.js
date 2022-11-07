import React from "react";
import { useField } from "formik";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import { Select } from "antd";

const getFieldCSSClasses = (touched, errors) => {
    const classes = ["form-control", "form-control-solid"];
    if (touched && errors) {
        classes.push("is-invalid-select");
    }

    if (touched && !errors) {
        classes.push("is-valid-select");
    }

    return classes.join(" ");
};

export function ValidationSelect({
    label,
    withFeedbackLabel = true,
    type = "text",
    showSearch,
    customFeedbackLabel,
    children,
    ...props
}) {
    const [field, meta] = useField(props);
    const { touched, error } = meta;
    return (
        <>
            {label && <label>Select {label}</label>}
            <Select
                className={getFieldCSSClasses(touched, error)}
                {...field}
                {...props}
            >
                {children}
            </Select>
            {withFeedbackLabel && (
                <FieldFeedbackLabel
                    erros={error}
                    touched={touched}
                    label={label}
                    customFeedbackLabel={customFeedbackLabel}
                />
            )}
        </>
    );
}
