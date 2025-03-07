const TrainerLevels = [
  "Trainer/img1.png", 
  "Trainer/img2.png", 
  "Trainer/img3.png", 
  "Trainer/img4.png", 
  "Trainer/img5.png", 
]

function getTrainerImage(level) {
  if(level === 0) return TrainerLevels[1]
  if(level >= 100) return TrainerLevels[4]
  return TrainerLevels[Math.ceil(level / 33)]
}

export default getTrainerImage