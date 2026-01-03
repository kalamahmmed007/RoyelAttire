import { useState } from 'react';

export const useForm = (initialValues = {}, validationRules = {}) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setValues({
            ...values,
            [name]: newValue,
        });

        // Clear error for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    // Handle blur
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true,
        });

        // Validate field on blur
        if (validationRules[name]) {
            validateField(name, values[name]);
        }
    };

    // Validate single field
    const validateField = (name, value) => {
        const rules = validationRules[name];
        if (!rules) return '';

        // Required validation
        if (rules.required && (!value || value.toString().trim() === '')) {
            const error = rules.message || `${name} is required`;
            setErrors((prev) => ({ ...prev, [name]: error }));
            return error;
        }

        // Min length validation
        if (rules.minLength && value.length < rules.minLength) {
            const error = `${name} must be at least ${rules.minLength} characters`;
            setErrors((prev) => ({ ...prev, [name]: error }));
            return error;
        }

        // Max length validation
        if (rules.maxLength && value.length > rules.maxLength) {
            const error = `${name} must be at most ${rules.maxLength} characters`;
            setErrors((prev) => ({ ...prev, [name]: error }));
            return error;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            const error = rules.patternMessage || `${name} is invalid`;
            setErrors((prev) => ({ ...prev, [name]: error }));
            return error;
        }

        // Custom validation
        if (rules.validate) {
            const error = rules.validate(value, values);
            if (error) {
                setErrors((prev) => ({ ...prev, [name]: error }));
                return error;
            }
        }

        // Clear error if validation passes
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return '';
    };

    // Validate all fields
    const validate = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationRules).forEach((field) => {
            const error = validateField(field, values[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // Handle submit
    const handleSubmit = (callback) => async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mark all fields as touched
        const allTouched = Object.keys(validationRules).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
        );
        setTouched(allTouched);

        // Validate
        if (validate()) {
            try {
                await callback(values);
            } catch (error) {
                console.error('Form submission error:', error);
            }
        }

        setIsSubmitting(false);
    };

    // Reset form
    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    };

    // Set field value
    const setFieldValue = (name, value) => {
        setValues({
            ...values,
            [name]: value,
        });
    };

    // Set field error
    const setFieldError = (name, error) => {
        setErrors({
            ...errors,
            [name]: error,
        });
    };

    // Set multiple values
    const setFormValues = (newValues) => {
        setValues({
            ...values,
            ...newValues,
        });
    };

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
        setFieldValue,
        setFieldError,
        setFormValues,
        validate,
    };
};

export default useForm;