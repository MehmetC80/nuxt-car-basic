export default async (id) => {
  const { data, error } = await useFetch(`/api/car/${id}`, {});

  if (error.value) {
    throw createError({
      statusCode: 404,
      message: "Daten konnten nicht abgerufen werden.",
    });
  }
  return { data };
};
