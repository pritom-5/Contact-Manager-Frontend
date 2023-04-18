const getSortedData = (data) => {
  const sortedArr = [...data];

  sortedArr.sort((a, b) => {
    switch (a.name.toLowerCase() > b.name.toLowerCase()) {
      case true:
        return 1;

      default:
        return -1;
    }
  });
  return sortedArr;
};

export default getSortedData;
