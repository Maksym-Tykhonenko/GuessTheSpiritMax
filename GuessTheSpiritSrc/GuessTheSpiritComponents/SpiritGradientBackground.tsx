import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

type SpiritGradientBackgroundProps = {
    colors?: string[];
    style?: object;
};

export const SpiritGradientBackground: React.FC<SpiritGradientBackgroundProps> = ({
    colors = ['#220D42', '#0B001C'],
    style = {},
}) => (
    <LinearGradient
        colors={colors}
        style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            ...style,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
    />
);
