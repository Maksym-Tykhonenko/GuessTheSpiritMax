import { Animated as SpiritAnim } from 'react-native';
import { useNavigation as useSpiritNav } from '@react-navigation/native';
import { SpiritGradientBackground } from '../GuessTheSpiritComponents/SpiritGradientBackground';
import { guessTheFontSpirit } from '../guessTheFontSpirit';
import React, {
    useEffect as useSpiritEffect,
    useState as useSpiritState,
} from 'react';
import {
    SafeAreaView as SpiritSafeArea,
    Pressable as GuessPressSpirit,
    Image as ImageSpirit,
    Text as TheTextOfGuess,
    View as SpiritView,
    useWindowDimensions as useSpiritViewpoDimSze,
} from 'react-native';
import { SpiritGradientButton } from '../GuessTheSpiritComponents/SpiritGradientButton';

const GuessTheSpiritOnboarding: React.FC = () => {
    const spiritNav = useSpiritNav();
    const [spiritStep, setSpiritStep] = useSpiritState(0);
    const { width: spiritWidth, height: spiritHeight } = useSpiritViewpoDimSze();

    const spiritPagesG = [
        {
            descrOfTheSpirit: `Guess the Spirit — a game where the phone is passed from player to player.
Everyone will receive their own secret task — and become the spirit of emotions for a few seconds.`,
            guessEmotionOf: require('../GuessTheSpiritAssets/GuessTheSpiritImages/guessMoodFirst/gsMood.png'),
            spirTopTextGuess: 'Pass the Spirit',
        },
        {
            guessEmotionOf: require('../GuessTheSpiritAssets/GuessTheSpiritImages/guessMoodFirst/angryOnTheTop.png'),
            spirTopTextGuess: `Play and Show`,
            descrOfTheSpirit: `Your turn — show an emotion, 
but without words.
Facial expressions, gestures, movements — everything so that others can feel what kind of spirit you have.`,
        },
        {
            guessEmotionOf: require('../GuessTheSpiritAssets/GuessTheSpiritImages/guessMoodFirst/allHappy.png'),
            descrOfTheSpirit: `Whoever guesses the emotion becomes the new Spirit.

Pass the phone on and discover the true mood of the company in everyone.`,
            spirTopTextGuess: 'Guess and be next',
        },
    ];

    const proceedSpirit = () => {
        const lastIndex = spiritPagesG.length - 1;
        if (spiritStep < lastIndex) {
            setSpiritStep(prev => prev + 1);
        } else {
            spiritNav.replace?.('EnteryPointOfGuessTheSpirit');
        }
    };

    return (
        <SpiritView
            style={{
                width: spiritWidth,
                flex: 1,
                backgroundColor: '#002756',
                height: spiritHeight,
                alignItems: 'center',
            }}
        >
            <SpiritGradientBackground />
            <SpiritSafeArea />
            <ImageSpirit
                resizeMode="contain"
                style={{
                    width: spiritWidth * 0.8,
                    height: spiritWidth * 0.8,
                    marginTop: spiritHeight * 0.07,
                }}
                source={spiritPagesG[spiritStep].guessEmotionOf}
            />

            <SpiritView style={{
                paddingHorizontal: spiritWidth * 0.03,
                position: 'absolute',
                borderTopRightRadius: spiritWidth * 0.07,
                bottom: 0,
                backgroundColor: '#6F24E2',
                width: spiritWidth,
                justifyContent: 'flex-start',
                height: spiritHeight * 0.35,
                paddingTop: spiritHeight * 0.03,
                alignItems: 'center',
                borderTopLeftRadius: spiritWidth * 0.07,
            }}>
                <TheTextOfGuess
                    style={{
                        textAlign: 'center',
                        fontSize: spiritWidth * 0.075,
                        color: 'white',
                        alignSelf: 'center',
                        width: spiritWidth * 0.97,
                        fontFamily: guessTheFontSpirit.guessMotExtraBol,
                    }}
                >
                    {spiritPagesG[spiritStep].spirTopTextGuess}
                </TheTextOfGuess>

                <TheTextOfGuess
                    style={{
                        alignSelf: 'center',
                        marginTop: spiritHeight * 0.023,
                        textAlign: 'center',
                        color: 'white',
                        width: spiritWidth * 0.844,
                        fontFamily: guessTheFontSpirit.guessMotMediu,
                        fontSize: spiritWidth * 0.0341,
                    }}
                >
                    {spiritPagesG[spiritStep].descrOfTheSpirit}
                </TheTextOfGuess>

                <SpiritGradientButton
                    label={spiritStep === 0 ? 'Continue' : spiritStep === 1 ? 'Next' : 'Start now'}
                    onPress={proceedSpirit}
                    variant="secondary"
                    arrow={true}
                    style={{
                        
                        bottom: spiritHeight * 0.03,
                        position: 'absolute',
                    }}
                    textStyle={{
                        fontFamily: guessTheFontSpirit.guessMotBol,
                        color: 'white',
                        fontSize: spiritWidth * 0.04800654534,
                    }}
                />
            </SpiritView>

        </SpiritView>
    );
};

export default GuessTheSpiritOnboarding;