import { Router } from "express";
import { createContactController, deleteContactController, getContactByIdController, getContactsController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactsSchema, updateContactsSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";


const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getContactsController));
contactRouter.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
contactRouter.post('/contacts', validateBody(createContactsSchema),ctrlWrapper(createContactController));
contactRouter.patch('/contacts/:contactId', isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactController));
contactRouter.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default contactRouter;
