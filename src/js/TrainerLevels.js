const TrainerLevels = [
  "Trainer/img1.png", 
  "Trainer/img2.png", 
  "Trainer/img3.png", 
  "Trainer/img4.png", 
  "Trainer/img5.png", 
];

function getTrainerImage(level) {

  const bigIntLevel = BigInt(level);

  if (bigIntLevel === 0n) return TrainerLevels[1];
  if (bigIntLevel >= 100n) return TrainerLevels[4];


  const index = Number(bigIntLevel / 33n) + 1;
  return TrainerLevels[Math.min(index, TrainerLevels.length - 1)];
}

export default getTrainerImage;