import React from "react";
import styles from "./VideoStreams.module.scss";
import { IVideoStreamsProps } from "./VideoStreams.props";
import cn from "classnames";

import CatIconOne from "../../assets/cat/Property1cat.svg";
import CatIconSecond from "../../assets/cat/Property2cat.svg";
import CatIconThird from "../../assets/cat/Property3.svg";
import CatIconFourth from "../../assets/cat/Property4cat.svg";
import Livekit from "../LiveKit/Livekit";

const VideoStreams: React.FC<IVideoStreamsProps> = ({ users }) => {
  const dummyArray = [CatIconOne, CatIconSecond, CatIconThird, CatIconFourth];

  return (
    <div className={styles.camerasArea}>
      <div
        className={cn(styles.cameras, {
          [styles.camerasSecondItems]: users.length === 2,
          [styles.camerasThirdItems]: users.length === 3 || 4,
        })}
      >
        {users.map((user, index) => (
          <div
            key={user.id}
            className={cn(styles.camera, {
              [styles.cameraOne] : users.length === 1,
              [styles.cameraSecond]: users.length === 2,
              [styles.cameraThird]: users.length === 3,
              [styles.cameraThirdCenter]: users.length === 3 && index === 2,
              [styles.cameraFourth]: users.length === 4,
            })}
          >
            {/* <img src={dummyArray[index]} alt="no video icon" /> */}
            <Livekit userName={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoStreams;
