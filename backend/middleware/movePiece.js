/**
 *movePiece.js
 */

const mongoose = require('mongoose');
const Piece = require('../model/piece');
const Slot = require('../model/slot');
const Move = require('../model/move');

module.exports = async (req, res, next) => {
  const {
    pieceId, targetPosition, addedBy 
  } = req.body;

  if (!pieceId || !targetPosition || !addedBy) {
    return res.status(400).send({ error: 'Missing required fields: pieceId, targetPosition, addedBy' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch the piece
    const piece = await Piece.findById(pieceId).session(session);
    if (!piece) {
      throw new Error('Piece not found');
    }

    // Fetch the target slot
    const slot = await Slot.findOne({ position: targetPosition }).session(session);
    if (!slot) {
      throw new Error('Target slot not found');
    }

    // Update the slot to reference the piece
    slot.slot = pieceId;
    await slot.save({ session });

    // Create a new move
    const move = new Move({
      pieceId,
      targetPosition: slot._id,
      addedBy,
      date: new Date(),
      isDeleted: false
    });
    await move.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).send({ message: 'Move registered successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).send({ error: error.message });
  }
};
