import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './style.module.css';

type Props = {
  locale: string
}

export function MicInput({ locale }: Props) {
  const [microphoneIsActive, setMicrophoneIsActive] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    console.log(listening, microphoneIsActive);
    if(!listening) setMicrophoneIsActive(false);
  }, [listening]);
  useEffect(() => {
    console.log(transcript);
  }, [transcript]);

  const microphoneSwitch = () => {
    setMicrophoneIsActive(old => !old);
    SpeechRecognition.startListening({ language: locale });
    if(!microphoneIsActive){
      resetTranscript();
    }
  };
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  return (
    <div className={styles.button}>
      {microphoneIsActive ? (
        <button
          className={'rounded-circle btn btn-danger text-light'}
          onClick={() => microphoneSwitch()}
        >
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
      ) : (
        <button
          onClick={() => microphoneSwitch()}
          className={'rounded-circle btn btn-info text-light'}
        >
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
      )}
      {transcript}
    </div>
  );
}
