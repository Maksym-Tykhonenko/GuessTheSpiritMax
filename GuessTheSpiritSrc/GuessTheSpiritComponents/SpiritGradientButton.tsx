import React from 'react';
import { Pressable, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { SpiritGradientBackground } from './SpiritGradientBackground';

type SpiritGradientButtonProps = {
    label: string;
    onPress: () => void;
    arrow?: boolean;
    variant?: 'primary' | 'secondary';
    style?: object;
    textStyle?: object;
    rowStyle?: object;
};

const gradients = {
    primary: ['#FA4730', '#FF93F4'],
    secondary: ['#6F24E2', '#3D147C'],
};

const arrowImg = require('../GuessTheSpiritAssets/GuessTheSpiritImages/guessArrowToRightSide.png');

export const SpiritGradientButton: React.FC<SpiritGradientButtonProps> = ({
    label,
    onPress,
    arrow = false,
    variant = 'secondary',
    style = {},
    textStyle = {},
    rowStyle = {},
}) => {
    const { width: spiritWidth, height: spiritHeight } = Dimensions.get('window');
    return (
        <Pressable onPress={onPress} style={[{
            justifyContent: 'center',
            height: spiritHeight * 0.08,
            borderRadius: spiritWidth * 0.03,
            width: spiritWidth * 0.44,
            borderWidth: spiritWidth * 0.003,
            borderColor: '#220D42',
            overflow: 'hidden',
            alignItems: 'center',
            alignSelf: 'center',
        }, , styles.base, style]}>
            <SpiritGradientBackground colors={gradients[variant]} />
            <View style={[
                styles.content,
                arrow ? { justifyContent: 'space-between' } : { justifyContent: 'center' },
                rowStyle
            ]}>
                <Text style={[styles.text, textStyle]}>
                    {label}
                </Text>
                {arrow &&
                    <Image
                        source={arrowImg}
                        style={styles.arrow}
                        resizeMode="contain"
                    />
                }
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    base: {
        overflow: 'hidden',
    },
    content: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    arrow: {
        width: 19,
        height: 19,
    },
});
