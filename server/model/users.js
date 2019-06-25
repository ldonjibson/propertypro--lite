const users = [
  {
    "id":1,
    "firstName": 'Nairobi',
    "lastName": 'Ozil',
    "email": 'nairobi@gmail.com',
    "password": '$2a$08$QClsX3MmKFZEaPjD/wo6LOFopJo.fDtbgv3xfpRFCnl5ZE.ugsNlO',
    "phoneNumber": '234818103200055',
    "address": '22, owodunni, street, ikeja',
    "accountType": 'agent', // client or agent
    "isAdmin": 'true', // must be a agent user account
    "createdOn": Date.now()
  },
  {
    "id":2,
    "firstName": 'Berlini',
    "lastName": 'jone',
    "email": 'Berliniike@gmail.com',
    "password": '$2a$08$QClsX3MmKFZEaPjD/wo6LOFopJo.fDtbgv3xfpRFCnl5ZE.ugsNlO',
    "phoneNumber": '234818103224000',
    "address": '22, owodunni, street, ikeja',
    "accountType": 'agent', // client or agent
    "isAdmin": 'false', // must be a agent user account
    "createdOn": Date.now()
  },
  {
    "id":3,
    "firstName": 'John',
    "lastName": 'dunga',
    "email": 'johndum@gmail.com',
    "password": '$2a$08$QClsX3MmKFZEaPjD/wo6LOFopJo.fDtbgv3xfpRFCnl5ZE.ugsNlO',
    "phoneNumber": '234908103224055',
    "address":  '22, owodunni, street, ikeja',
    "accountType": 'client', // client or agent
    "isAdmin": 'false', // must be a agent user account
    "createdOn": Date.now()
  },
  {
    "id":4,
    "firstName": 'Mark',
    "lastName": 'Rio',
    "email": 'MarkRio@gmail.com',
    "password": '$2a$08$QClsX3MmKFZEaPjD/wo6LOFopJo.fDtbgv3xfpRFCnl5ZE.ugsNlO',
    "phoneNumber": '234808003224055',
    "address": '22, owodunni, street, ikeja',
    "accountType": 'client', // client or agent
    "isAdmin": 'false', // must be a agent user account
    "createdOn": Date.now()
  },
  {
    "id":5,
    "firstName": 'Helsinki',
    "lastName": 'soldier',
    "email": 'helsinki@gmail.com',
    "password": '$2a$08$QClsX3MmKFZEaPjD/wo6LOFopJo.fDtbgv3xfpRFCnl5ZE.ugsNlO',
    "phoneNumber": '234818103224055',
    "address": '22, owodunni, street, ikeja',
    "accountType": 'client', // client or agent
    "isAdmin": 'false', // must be a agent user account
    "createdOn": Date.now()
  },

  {
    "id":6,
    "firstName": 'Blessing',
    "lastName": 'ashimi',
    "email": 'ashimi@gmail.com',
    "password": '$2a$08$QClsX3MmKFZEaPjD/wo6LOFopJo.fDtbgv3xfpRFCnl5ZE.ugsNlO',
    "phoneNumber": '234818122224455',
    "address": '22, owodunni, street, ikeja',
    "accountType": 'client', // client or agent
    "isAdmin": 'false', // must be a agent user account
    "createdOn": Date.now()
  },

  {
    "id":7,
    "firstName": 'Ajibola',
    "lastName": 'Hussain',
    "email": 'ajibolahussain@gmail.com',
    "password": '$2a$08$QClsX3MmKFZEaPjD/wo6LOFopJo.fDtbgv3xfpRFCnl5ZE.ugsNlO',
    "phoneNumber": '234808133224455',
    "address": '22, owodunni, street, ikeja',
    "accountType": 'agent', // client or agent
    "isAdmin": 'false', // must be a agent user account
    "createdOn": Date.now()
  },
];
export default users;
