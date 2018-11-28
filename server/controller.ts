const getPhoto = (req:any, res:any, next:any) =>
{
  const dbInst = req.app.get('db');
  dbInst.get_photo(req.params.pid)
    .then(response => res.status(200).send(response))
    .catch(err => console.log(`Error in get_photo(): ${err}`));
};

module.exports =
{
  getPhoto
};