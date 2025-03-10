class QueryHelper {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filterAndSearch(searchField = "firstName") {
    const queryObj = { ...this.queryString }; //ensuring deep copy not touching the original
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    if (queryObj.search) {
      queryObj[searchField] = { $regex: queryObj.search, $options: "i" };
      delete queryObj.search;
    }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      console.log(this.queryString.sort);
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
      console.log("calling ");
    } else {
      this.query = this.query.sort("-createdAt"); //this will fix the pagination in chatting and also in many cases
    }

    return this;
  }

  paginate(maxLimit = 10) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || maxLimit;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default QueryHelper;
