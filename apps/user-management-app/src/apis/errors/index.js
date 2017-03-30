import awaitify from 'awaitify';

const asyncError = (statusCode) => {
  return awaitify(function * (req, res) {
    let viewFilePath = String(statusCode),
      result = {
        status: statusCode
      };

    try{
      yield awaitify.cb((cb) => res.render(viewFilePath, cb));
      res.render(viewFilePath);
    } catch (err){
      return res.status(statusCode).json(result);
    }
  })
};

export const notFound = asyncError(404);
export const invalidData = asyncError(500);