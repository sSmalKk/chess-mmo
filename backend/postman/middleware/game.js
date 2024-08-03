/**
 *game.js
 */

const mongoose = require('mongoose');
const Game = require('../models/game');
const Table = require('../models/table');
const Slot = require('../models/slot');

module.exports = async (req, res, next) => {
  try {
    const {
      size, addedBy 
    } = req.body;

    if (!size || typeof size !== 'number') {
      return res.status(400).send({ message: 'Size is required and must be a number' });
    }

    // Create the game
    const game = new Game({
      size,
      addedBy,
      updatedBy: addedBy,
    });
    await game.save();

    const tables = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const coordinate = y * size + x;

        // Create a new table
        const table = new Table({
          coordnate: coordinate,
          x,
          y,
          addedBy,
          updatedBy: addedBy,
        });
        await table.save();
        tables.push(table._id);

        // Create 64 slots for each table
        const slots = [];
        for (let slotY = 0; slotY < 8; slotY++) {
          for (let slotX = 0; slotX < 8; slotX++) {
            const position = slotY * 8 + slotX + 1;
            const slot = new Slot({
              position,
              x: slotX,
              y: slotY,
              addedBy,
              updatedBy: addedBy,
            });
            await slot.save();
            slots.push(slot._id);
          }
        }
      }
    }

    game.tables = tables;
    await game.save();

    res.status(201).send({
      message: 'Game created successfully',
      game 
    });

  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).send({ message: 'Internal server error' });
  }

  return next();
};
