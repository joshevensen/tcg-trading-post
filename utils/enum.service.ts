function formatEnumLabel(label: string) {
  if (!label) return "";
  return String(label)
    .replace(/([A-Z])/g, " $1")
    .replace(/([/])/g, " $1")
    .replace(/([_])/g, "")
    .trim();
}

function getEnumArray<Type extends { [key: string]: string }>(
  enumObject: Type
) {
  const array: { id: string; label: string }[] = [];

  const keys = Object.keys(enumObject).filter((key) => isNaN(Number(key)));
  const values = Object.values(enumObject);

  keys.forEach((key, index) => {
    array.push({
      id: key,
      label: formatEnumLabel(values[index]),
    });
  });

  return array;
}

function getEnumOptions(enumObject: any) {
  const options: any[] = [];

  const enumArray = getEnumArray(enumObject);

  enumArray.forEach((item) => {
    options.push({
      value: item.id,
      label: item.label,
    });
  });

  return options;
}

const enumService = {
  formatLabel: formatEnumLabel,
  toArray: getEnumArray,
  toOptions: getEnumOptions,
};

export default enumService;
