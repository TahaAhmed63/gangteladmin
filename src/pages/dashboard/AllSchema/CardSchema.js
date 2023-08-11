import * as Yup from 'yup';

export const newCardSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    obtained: Yup.string().required('Obtained is required'),
    character: Yup.string().required('Select an Character'),
  });

  export   const getDefaultValues = (currentCard) => ({
    name: currentCard.name || '',
      obtained: currentCard.obtained || '',
      character:currentCard.character || '',
    })