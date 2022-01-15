module.exports = {
  formatJoiError(errors) {
    // console.log(JSON.stringify(errors, null, 2));
    errors = Array.isArray(errors) ? errors : [];
    return errors.reduce((acc, cur) => {
      if (cur.path.length > 1) {
        const [currentProperty, firstChild, ...rest] = cur.path;
        const message = cur.message.replace(/".*"/, `"${firstChild}"`);
        const error = this.formatJoiError([
          {
            ...cur,
            message,
            path: [firstChild, ...rest],
          },
        ]);
        if (acc[currentProperty]) {
          Object.assign(acc[currentProperty], error);
        } else {
          acc[currentProperty] = error;
        }
        return acc;
      }

      const [property] = cur.path;
      acc[property] = cur.message;
      return acc;
    }, {});
  },
  getPaginateOptions(
    paginateDTO,
    sort,
    populate,
  ) {
    const { page = 1, limit = 100, all } = paginateDTO;
    const pagination = !(
      all === '1' ||
      all === 'true' ||
      all === 'yes' ||
      all === 'on'
    );

    const opts = {
      customLabels: {
        docs: 'data',
        totalPages: 'pageCount',
        limit: 'perPage',
        totalDocs: 'total',
        prevPage: 'previousPage',
      },
      page,
      limit,
      pagination,
    };
    if (populate) {
      opts.populate = populate;
    }
    if (sort) {
      opts.sort = sort;
    }

    return opts;
  }
};
