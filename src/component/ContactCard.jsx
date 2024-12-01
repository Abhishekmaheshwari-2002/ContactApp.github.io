import { MdEdit } from "react-icons/md";
import { FaUser, FaTrash } from "react-icons/fa6";
import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclosure from "../hook/useDisclosure";

const ContactCard = ({ contact }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "Contacts", id));
            toast.success("deleted successfully");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div
                key={contact.id}
                className="items-center bg-yellow-100 flex justify-between p-2  rounded-lg"
            >
                <div className="flex  gap-1">
                    <FaUser className="text-orange text-4xl" />
                    <div className="">
                        <h2 className="text-medium">{contact.name}</h2>
                        <p className="text-sm">{contact.email}</p>
                    </div>
                </div>
                <div className="flex text-3xl  ">
                    <MdEdit onClick={onOpen} className="cursor-pointer" />
                    <FaTrash
                        onClick={() => deleteContact(contact.id)}
                        className="text-orange cursor-pointer"
                    />
                </div>
            </div>
            <AddAndUpdateContact
                contact={contact}
                isUpdate
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default ContactCard;
