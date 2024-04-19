import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number()
    .min(1886)
    .max(new Date().getFullYear() + 1),
  miles: Joi.number().required().min(0),
  city: Joi.string().min(2).required(),
  numberOfSeats: Joi.number().min(1).max(100).required(),
  features: Joi.array().items(Joi.string()).required(),
  image: Joi.string().required(),
  price: Joi.number().min(0).required(),
  name: Joi.string().required(),
  description: Joi.string().min(2).required(),
  listerId: Joi.string().required(),
});

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const { error } = await schema.validate(body);

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const {
    make,
    name,
    numberOfSeats,
    price,
    image,
    miles,
    features,
    description,
    city,
    year,
    model,
    listerId,
  } = await body;

  const car = await prisma.car.create({
    data: {
      make,
      name,
      numberOfSeats: parseInt(numberOfSeats),
      price,
      image,
      miles,
      features,
      description,
      city: city.toLowerCase(),
      year,
      model,
      listerId,
    },
  });

  return { car };
});
