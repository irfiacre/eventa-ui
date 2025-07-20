const getEmptyFields = (obj: Record<string, any>) => {
  return Object.keys(obj).filter((key) => {
    let value = obj[key];
    return (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" &&
        value !== null &&
        Object.keys(value).length === 0)
    );
  });
};

export { getEmptyFields };
