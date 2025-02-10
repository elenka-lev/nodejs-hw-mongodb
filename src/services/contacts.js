import { SORT_ORDER } from "../constants/index.js";
import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
    userId,
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
    }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find({userId});

    if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
    };

     if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
    };

    const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

    const paginationData = calculatePaginationData(contactsCount, perPage, page);


    return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
    const contact = await ContactsCollection.findOne({ _id: contactId, userId });
    return contact;
};



export const createContact = async (userId, payload) => {
  const contact = await ContactsCollection.create({...payload, userId });
  return contact;
};

export const updateContacts = async (userId, contactId, payload, options = {}) => {
    const updateContact = await ContactsCollection.findOneAndUpdate(
        { _id: contactId, userId },
        payload,
        {
             new: true,
            includeResultMetadata: true,
            ...options,
        }
    );
    if (!updateContact || !updateContact.value) return null;

    return {
        contact: updateContact.value,
        isNew: Boolean(updateContact?.lastErrorObject?.upserted),
    };
};
export const deleteContact = async (userId, contactId) => {
const contact = await ContactsCollection.findOneAndDelete({
  _id: contactId,
  userId
  });

  return contact;
};
