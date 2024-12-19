```typescript
interface TemplateData {
  contactName: string;
  age?: number;
  specialOffer?: {
    code: string;
    discount: string;
    expiryDays: number;
  };
}

export const BirthdayTemplates = {
  email: {
    formal: {
      en: (data: TemplateData) => ({
        subject: `Happy Birthday, ${data.contactName}!`,
        body: `
Dear ${data.contactName},

We hope this message finds you well. On behalf of the entire team, we would like to extend our warmest birthday wishes to you.

${data.specialOffer ? `
As a token of our appreciation, we're pleased to offer you a special birthday gift:
${data.specialOffer.discount} off your next purchase with code: ${data.specialOffer.code}
Valid for ${data.specialOffer.expiryDays} days.
` : ''}

Best regards,
The InsightFusion Team
        `
      }),
      fr: (data: TemplateData) => ({
        subject: `Joyeux Anniversaire, ${data.contactName}!`,
        body: `
Cher/Chère ${data.contactName},

Nous espérons que ce message vous trouve en pleine forme. Au nom de toute l'équipe, nous souhaitons vous adresser nos meilleurs vœux d'anniversaire.

${data.specialOffer ? `
En témoignage de notre reconnaissance, nous sommes heureux de vous offrir un cadeau d'anniversaire spécial :
${data.specialOffer.discount} de réduction sur votre prochain achat avec le code : ${data.specialOffer.code}
Valable pendant ${data.specialOffer.expiryDays} jours.
` : ''}

Cordialement,
L'équipe InsightFusion
        `
      })
    },
    casual: {
      en: (data: TemplateData) => ({
        subject: `🎉 Happy Birthday ${data.contactName}!`,
        body: `
Hi ${data.contactName}!

Happy Birthday! 🎂 We hope your day is filled with joy and celebration!

${data.specialOffer ? `
Here's a little birthday present from us:
Get ${data.specialOffer.discount} off with code: ${data.specialOffer.code}
(Valid for ${data.specialOffer.expiryDays} days)
` : ''}

Best wishes,
The InsightFusion Team
        `
      })
    },
    humorous: {
      en: (data: TemplateData) => ({
        subject: `🎂 Another Year of Awesomeness, ${data.contactName}!`,
        body: `
Hey ${data.contactName}! 

They say age is just a number, but we think it's a great excuse for cake! 🍰

${data.specialOffer ? `
Speaking of treats, here's your birthday gift:
Use code ${data.specialOffer.code} for ${data.specialOffer.discount} off!
(Quick, grab it before it expires in ${data.specialOffer.expiryDays} days!)
` : ''}

Stay awesome!
The InsightFusion Team
        `
      })
    }
  },
  sms: {
    formal: {
      en: (data: TemplateData) => 
        `Dear ${data.contactName}, wishing you a very happy birthday. Best regards, The InsightFusion Team${
          data.specialOffer ? ` Use code ${data.specialOffer.code} for ${data.specialOffer.discount} off.` : ''
        }`,
      fr: (data: TemplateData) =>
        `Cher/Chère ${data.contactName}, nous vous souhaitons un très joyeux anniversaire. Cordialement, L'équipe InsightFusion${
          data.specialOffer ? ` Utilisez le code ${data.specialOffer.code} pour ${data.specialOffer.discount} de réduction.` : ''
        }`
    },
    casual: {
      en: (data: TemplateData) =>
        `Happy Birthday ${data.contactName}! 🎉 Hope you have an amazing day!${
          data.specialOffer ? ` Here's ${data.specialOffer.discount} off with code: ${data.specialOffer.code}` : ''
        }`
    },
    humorous: {
      en: (data: TemplateData) =>
        `🎂 HBD ${data.contactName}! Another year of being fabulous!${
          data.specialOffer ? ` Quick birthday gift: ${data.specialOffer.discount} off with ${data.specialOffer.code}` : ''
        }`
    }
  }
};
```