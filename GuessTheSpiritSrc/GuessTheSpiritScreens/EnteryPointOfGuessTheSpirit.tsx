import SpiriGuessPageToNavigateUser from './SpiriGuessPageToNavigateUser';
import {
    SafeAreaView,
    Platform as OperationSystem,
    Keyboard,
    Image,
    TouchableWithoutFeedback,
    Text as TextTHeGSP,
    Dimensions as SizeOfPage,
    TouchableOpacity,
    View as GueViewBoxSpiri,
} from 'react-native';
import { guessTheFontSpirit } from '../guessTheFontSpirit';
import TheRulesOfSpirGuet from './TheRulesOfSpirGuet';
import { SpiritGradientBackground } from '../GuessTheSpiritComponents/SpiritGradientBackground';
type SpiritAppScreens =
| 'Spiri Guess Rules of App'
| 'Game With Time And Friends'
| 'Addintional Information about Guess the Spirit'
| 'Entery Point Of Guessing'
| 'Spirit Guessing Settings The';
import FriendlySpiritGuessGame from './FriendlySpiritGuessGame';
import React, { useState as useSpiritState, useEffect, useRef } from 'react';
import TSGSettingsOfSpiritGess from './TSGSettingsOfSpiritGess';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: guessWidthSpir, height: guessHeighSpir } = SizeOfPage.get('window');

const EnteryPointOfGuessTheSpirit: React.FC = () => {
    const SpiritTextLabel = TextTHeGSP;
    const [gSoSpiround, setGSoSpiround] = useSpiritState(true);
    const [pgOfGuessScreenSpt, setOfGuessScreenSpt] = useSpiritState<SpiritAppScreens>('Entery Point Of Guessing');
    
    const SpiritSafe = SafeAreaView;
    const [stageFrame, setStageFrame] = useSpiritState({ width: guessWidthSpir, height: guessHeighSpir });
    const RootView = GueViewBoxSpiri;

    const deviceIsAndroid = OperationSystem.OS === 'android';

    // Ref для Sound instance
    const soundRef = useRef<any>(null); // any, бо тип буде після імпорту

    useEffect(() => {
        // Музика тільки для iOS
        if (OperationSystem.OS === 'ios') {
            let Sound: any;
            import('react-native-sound').then((module) => {
                Sound = module.default;
                if (gSoSpiround) {
                    if (!soundRef.current) {
                        soundRef.current = new Sound('guessTheSpiritSound.mp3', Sound.MAIN_BUNDLE, (error: any) => {
                            if (!error) {
                                soundRef.current?.setNumberOfLoops(-1);
                                soundRef.current?.play();
                            }
                        });
                    } else {
                        soundRef.current.play();
                    }
                } else {
                    soundRef.current?.stop();
                }
            });
        }
        // При анмаунті очищаємо тільки для iOS
        return () => {
            if (OperationSystem.OS === 'ios' && soundRef.current) {
                soundRef.current.release();
                soundRef.current = null;
            }
        };
    }, [gSoSpiround]);

    // Додаємо useEffect для завантаження spirit_melody_enabled
    useEffect(() => {
        const loadSpiritMelodyEnabled = async () => {
            try {
                const value = await AsyncStorage.getItem('spirit_melody_enabled');
                if (value !== null) {
                    setGSoSpiround(value === 'true');
                }
            } catch (e) {
                // handle error if needed
            }
        };
        loadSpiritMelodyEnabled();
    }, []);

    const renderScene = () => {
        switch (pgOfGuessScreenSpt) {
            case 'Entery Point Of Guessing':
                return <SpiriGuessPageToNavigateUser setOfGuessScreenSpt={setOfGuessScreenSpt} />;
            case 'Spiri Guess Rules of App':
            case 'Addintional Information about Guess the Spirit':
                return <TheRulesOfSpirGuet pgOfGuessScreenSpt={pgOfGuessScreenSpt} />;
            case 'Spirit Guessing Settings The':
                return <TSGSettingsOfSpiritGess gSoSpiround={gSoSpiround} setGSoSpiround={setGSoSpiround} />;
            case 'Game With Time And Friends':
                return <FriendlySpiritGuessGame />;
            default:
                return (
                    <RootView>
                        <SpiritTextLabel style={{ color: 'white' }}>Under development</SpiritTextLabel>
                    </RootView>
                );
        }
    };

    const deriveSceneTitle = (scene: SpiritAppScreens) => {
        switch (scene) {
            case 'Spiri Guess Rules of App':
                return 'Game rules';
            case 'Addintional Information about Guess the Spirit':
                return 'Information';
            case 'Game With Time And Friends':
                return 'Start Play';
            case 'Spirit Guessing Settings The':
                return 'Settings';
            default:
                return '';
        }
    };

    const spirNameOfSceneGues = deriveSceneTitle(pgOfGuessScreenSpt);

    const arrowSize = guessWidthSpir * 0.055;
    const horizontalPadding = guessWidthSpir * 0.07;
    const titleFontSize = guessWidthSpir * 0.07;
    const guessArrowToRightSide = require('../GuessTheSpiritAssets/GuessTheSpiritImages/arLeftSpiriGues.png');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <RootView
                style={{
                    width: stageFrame.width,
                    flex: 1,
                    height: stageFrame.height,
                }}
            >
                <SpiritGradientBackground />

                {deviceIsAndroid && (
                    <RootView style={{ paddingTop: stageFrame.height * 0.0412 }} />
                )}

                <SpiritSafe />

                {pgOfGuessScreenSpt !== 'Entery Point Of Guessing' && (
                    <GueViewBoxSpiri
                        style={{
                            paddingHorizontal: horizontalPadding,
                            paddingBottom: guessHeighSpir * 0.04,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: guessWidthSpir * 0.04,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setOfGuessScreenSpt('Entery Point Of Guessing')}
                            style={{
                                zIndex: 10,
                            }}
                        >
                            <Image
                                source={guessArrowToRightSide}
                                style={{
                                    width: arrowSize,
                                    height: arrowSize,
                                    resizeMode: 'contain',
                                    tintColor: '#fff',
                                }}
                            />
                        </TouchableOpacity>

                        <SpiritTextLabel
                            style={{
                                alignSelf: 'center',
                                fontSize: titleFontSize,
                                fontFamily: guessTheFontSpirit.guessMotSemiBol,
                                color: '#fff',
                            }}
                        >
                            {spirNameOfSceneGues}
                        </SpiritTextLabel>

                        <GueViewBoxSpiri style={{ width: arrowSize }} />
                    </GueViewBoxSpiri>
                )}

                {renderScene()}

            </RootView>
        </TouchableWithoutFeedback>
    );
};

export default EnteryPointOfGuessTheSpirit;