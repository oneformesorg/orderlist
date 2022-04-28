import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { numberAndNameContext } from '@modules/CreateItemForm/CreateItemForm';
import React, { useContext, useEffect, useState } from 'react';
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
  const { setName,setNumber } = useContext(numberAndNameContext);

  useEffect(() => {
    if(!listening) setMicrophoneIsActive(false);
  }, [listening]);
  useEffect(() => {
    if(transcript && !microphoneIsActive){
      const text = transcript.split(/número|number/).map(item => item.trim());
      if(text.length === 1){
        if(isNaN(Number(text[0]))){
          setName(text[0]);
        }else {
          setNumber(text[0]);
        }
      }else {
        if(!isNaN(Number(text[1]))){
          setNumber(text[1]);
        }
        setName(text[0]);
      }
    }
  }, [transcript, microphoneIsActive, setName,setNumber]);

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
    </div>
  );
}
