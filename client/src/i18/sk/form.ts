export default {
  name: 'Meno',
  email: 'Email',
  placeholders: {
    name: 'Zadajte svoje meno',
    email: 'Zadajte svoj email'
  },
  userList: {
    title: 'Zoznam všetkých používateľov'
  },
  success: {
    userCreated: 'Používateľ bol úspešne vytvorený'
  },
  actions: {
    closeNow: 'Zatvoriť',
    addUser: 'Pridať používateľa',
  },
  errors: {
    requiredName: 'Meno je povinné',
    requiredEmail: 'Email je povinný',
    minName: 'Meno musí mať aspoň {min} znaky',
    maxName: 'Meno nemôže mať viac ako {max} znakov',
    invalidEmail: 'Neplatný formát emailu',
    nameExists: 'Toto meno už existuje',
    emailExists: 'Tento email už existuje'
  }
}