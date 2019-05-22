const mongoose = require('mongoose');
const Room = mongoose.model('Room');
const config = require('../../config/config');

mongoose.set('useFindAndModify', false);

exports.index = async function(req, res) {
  let { _id } = req.decoded;
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const limit = config.LIMIT_ITEM_SHOW;
  const options = {
    userId: _id,
    limit: limit,
    page: page,
  };
  let rooms = await Room.getListRoomByUserId(options);

  return res.status(200).json(rooms);
};

exports.getQuantityRoomsByUserId = async function(req, res) {
  const { _id } = req.decoded;
  const data = await Room.getQuantityRoomsByUserId(_id);

  res.json({ result: data });
};
