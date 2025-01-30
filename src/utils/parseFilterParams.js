
const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type.toLowerCase());

  if (isType(contactType)) return contactType.toLocaleLowerCase();
};

const parseIsFavourite = (isFavorite) => {
  const isString = typeof isFavorite === 'string';
  if (!isString) return;
  const isBooleanString = (value) =>
    ['true', 'false'].includes(value.toLowerCase());

  if (isBooleanString(isFavorite)) return isFavorite.toLowerCase();
};


export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedType = parseContactType(contactType);
    const parsedFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedType,
        isFavourite: parsedFavourite,
    };
};
