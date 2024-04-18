import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "de", "fr"] },
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-0]+$/)
    .required(),
  name: Joi.string().required(),
  message: Joi.string().min(2).required(),
});

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody();
  const { listingId } = event.context.params;

  const { error, value } = await schema.validate(body);

  const { email, message, phone, name } = await body;

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const newMessage = await prisma.message.create({
    data: {
      message,
      email,
      phone,
      name,
      listingId: parseInt(listingId),
    },
  });

  return newMessage;
});
