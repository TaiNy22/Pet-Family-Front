export interface WhatsappMessage {
  messaging_product: string;
  to: string;
  type: string;
  template: {
    name: string;
    language: {
      code: string
    },
    components: [
      {
        type: string;
        parameters: [
          {
            type: string;
            text: string;
          },
          {
            type: string;
            text: string;
          }
        ]
      }
    ]
  }
}

// Example
// {
//   "messaging_product": "whatsapp",
//   "to": "{{Recipient-Phone-Number}}",
//   "type": "template",
//   "template": {
//   "name": "recordatorio",
//     "language": {
//     "code": "es_ES"
//   },
//   "components": [
//     {
//       "type": "body",
//       "parameters": [
//         {
//           "type": "text",
//           "text": "1"
//         }
//       ]
//     }
//   ]
// }
// }
