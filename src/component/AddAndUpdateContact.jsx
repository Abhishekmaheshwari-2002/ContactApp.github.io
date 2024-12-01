import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("invalid Email").required("email is required"),
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "Contacts");
            await addDoc(contactRef, contact);
            onClose();
            toast.success("contact added Successfully");
        } catch (error) {
            console.log(error);
        }
    };
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "Contacts", id);
            await updateDoc(contactRef, contact);
            onClose();
            toast.success("contact updated successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik
                    validationSchema={contactSchemaValidation}
                    initialValues={
                        isUpdate
                            ? {
                                name: contact.name,
                                email: contact.email,
                            }
                            : {
                                name: "",
                                email: "",
                            }
                    }
                    onSubmit={(values) => {
                        isUpdate ? updateContact(values, contact.id) : addContact(values);
                    }}
                >
                    <Form className="gap-4 flex flex-col">
                        <div className="flex flex-col gap-1 ">
                            <Field name="name" className="border h-[40px] " />
                            <div className="">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 ">
                            <Field name="email " className="border h-[40px] " />
                            <div className="">
                                <ErrorMessage name="email" />
                            </div>
                        </div>

                        <button className="bg-orange px-3  py-1.5 border self-end">
                            {isUpdate ? "update" : "add"} contact
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
};

export default AddAndUpdateContact;
