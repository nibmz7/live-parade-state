const MAXIMUM_JUMP_DISTANCE = 50;

const countJumps = (rocks) => {
  let jumpCount = 0;
  let distanceJumped = 0;
  let extraJumpDistance = 0;
  for (let rockDistance of rocks) {
    let distanceToNextRock = rockDistance - distanceJumped;
    console.log({rockDistance, distanceJumped, extraJumpDistance, distanceToNextRock});
    if (distanceToNextRock > MAXIMUM_JUMP_DISTANCE) {
        console.log('error');
        return -1;
    };
    if (extraJumpDistance > 0 && extraJumpDistance >= distanceToNextRock) {
      extraJumpDistance -= distanceToNextRock;
      distanceJumped += distanceToNextRock;
      continue;
    }
    if (distanceToNextRock <= MAXIMUM_JUMP_DISTANCE) {
      distanceJumped += distanceToNextRock;
      extraJumpDistance = MAXIMUM_JUMP_DISTANCE - distanceToNextRock;
      jumpCount++;
    }
  }
  return jumpCount;
};
