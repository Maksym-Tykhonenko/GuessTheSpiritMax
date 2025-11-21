import { SpiritGradientBackground } from '../GuessTheSpiritComponents/SpiritGradientBackground';
import { useNavigation as useSpiritNav } from '@react-navigation/native';
const SPIRIT_LAUNCH_MARK = 'spiritguess_portledger_first_run';
import { Alert, Animated } from 'react-native';
const SPIRIT_USER_KEY = 'spiritguess_portledger_user';
import React, { useLayoutEffect as useSpiritLayout, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Image as THeGImage,
    View as SpiritWrap,
    Dimensions as SpiritScreen,
} from 'react-native';

const SpiritLoadingScreen: React.FC = () => {
    const logoAnim = useRef(new Animated.Value(0)).current;
    const spiritNav = useSpiritNav();
    const { width: spiritWidth, height: spiritHeight } = SpiritScreen.get('window');

    useEffect(() => {
        Animated.timing(logoAnim, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true,
        }).start();
    }, []);

    useSpiritLayout(() => {
        let onboardRequired = false;

        const spiritBootstrap = async () => {
            try {
                const [launchGuesTheFlagSpiri, userSpiritProfile] = await Promise.all([
                    AsyncStorage.getItem(SPIRIT_LAUNCH_MARK),
                    AsyncStorage.getItem(SPIRIT_USER_KEY),
                ]);

                if (!launchGuesTheFlagSpiri && !userSpiritProfile) {
                    onboardRequired = true;
                    await AsyncStorage.setItem(SPIRIT_LAUNCH_MARK, 'true');
                }
            } catch (errorSpirit) {
                if (__DEV__) console.warn('SpiritLoadingScreen init:', errorSpirit);
            }

            setTimeout(() => {
                spiritNav.replace(
                    onboardRequired
                        ? 'SpiritOnboardingScreen'
                        : 'EnteryPointOfGuessTheSpirit',
                );
            }, 2100);
        };

        spiritBootstrap();
    }, [spiritNav, spiritWidth]);

    return (
        <SpiritWrap
            style={{
                backgroundColor: '#0B0B0B',
                width: spiritWidth,
                height: spiritHeight,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <SpiritGradientBackground />

            <Animated.View
                style={{
                    marginTop: spiritHeight * 0.04,
                    shadowOpacity: 0.4,
                    shadowOffset: { width: 0, height: 0 },
                    height: spiritWidth * 0.579534,
                    borderRadius: spiritWidth * 0.1253,
                    opacity: logoAnim,
                    marginBottom: spiritHeight * 0.1,
                    shadowRadius: spiritWidth * 0.05,
                    width: spiritWidth * 0.579534,
                    shadowColor: '#FF93F4',
                    transform: [
                        {
                            scale: logoAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.7, 1],
                            }),
                        },
                        {
                            rotate: logoAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['-10deg', '0deg'],
                            }),
                        },
                    ],
                }}
            >
                <THeGImage
                    source={require('../GuessTheSpiritAssets/GuessTheSpiritImages/spiriSmallGuess.png')}
                    style={{
                        borderRadius: spiritWidth * 0.1253,
                        height: spiritWidth * 0.579534,
                        width: spiritWidth * 0.579534,
                    }}
                    resizeMode='stretch'
                />
            </Animated.View>
        </SpiritWrap>
    );
};

export default SpiritLoadingScreen;