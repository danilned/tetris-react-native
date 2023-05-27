import storage from "../store";

export const getScore = async () => {
  try {
    const data = await storage.load({
      key: "bestScore",
    });

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const setScore = async (score) => {
  try {
    const data = await storage.save({
      key: "bestScore",
      expires: null,
      data: {
        score,
      },
    });

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};
