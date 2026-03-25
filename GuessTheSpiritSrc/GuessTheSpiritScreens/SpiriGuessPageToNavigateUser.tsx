const gueSpirPagesLinks = [
    {
        linkToPage: 'Game With Time And Friends',
        guessViewable: 'Start Play',
    },
    {
        guessViewable: 'Game Rules',
        linkToPage: 'Spiri Guess Rules of App',
    },
    {
        guessViewable: 'Information',
        linkToPage: 'Addintional Information about Guess the Spirit',
    },
    {
        guessViewable: 'Settings',
        linkToPage: 'Spirit Guessing Settings The',
    },
    
]
import {
    Image,
    View as TheViewOfSpirits,
    Dimensions as DiagonalOfUsersPhone,
} from 'react-native';

import { SpiritGradientButton } from '../GuessTheSpiritComponents/SpiritGradientButton';

interface SpiriGuessPageToNavigateUserProps {
    setOfGuessScreenSpt: React.Dispatch<React.SetStateAction<string>>;
}
import React, { useState } from 'react';

const SpiriGuessPageToNavigateUser: React.FC<SpiriGuessPageToNavigateUserProps> = ({ setOfGuessScreenSpt }) => {
    const [activeSpiridx, setActiveSpiridx] = useState<number | null>(null);
    const { width: guessWidthSpir, height: guessHeighSpir } = DiagonalOfUsersPhone.get('window');

    const linkToSpirScreen = (idx: number, linkToPage: string) => {
        setActiveSpiridx(idx);
        setTimeout(() => {
            setOfGuessScreenSpt(linkToPage);
            setActiveSpiridx(null);
        }, 300);
    };

    return (
        <TheViewOfSpirits
            style={{
                justifyContent: 'flex-start',
                width: guessWidthSpir,
                alignItems: 'center',
                height: guessHeighSpir,
                flex: 1,
            }}
        >
            <TheViewOfSpirits style={{
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                height: guessWidthSpir * 0.579534,
                borderRadius: guessWidthSpir * 0.1253,
                shadowColor: '#FF93F4',
                marginBottom: guessHeighSpir * 0.1,
                shadowRadius: guessWidthSpir * 0.05,
                width: guessWidthSpir * 0.579534,
                marginTop: guessHeighSpir * 0.04,
            }}>
                <Image
                    source={require('../GuessTheSpiritAssets/GuessTheSpiritImages/spiriSmallGuess.png')}
                    style={{
                        height: guessWidthSpir * 0.579534,

                        borderRadius: guessWidthSpir * 0.1253,

                        width: guessWidthSpir * 0.579534,

                    }}
                    resizeMode='stretch'
                />
            </TheViewOfSpirits>
            {gueSpirPagesLinks.map((spirPage, idx) => (
                <SpiritGradientButton
                    onPress={() => linkToSpirScreen(idx, spirPage.linkToPage)}
                    label={spirPage.guessViewable}
                    variant={activeSpiridx === idx ? 'primary' : 'secondary'}
                    key={spirPage.linkToPage}
                    style={{
                        width: guessWidthSpir * 0.53,

                        marginBottom: guessHeighSpir * 0.012,
                    }}
                    arrow={true}
                    textStyle={{
                        fontSize: guessWidthSpir * 0.044,

                        color: activeSpiridx ? '#220D42' : 'white'
                    }}
                    rowStyle={{
                        paddingHorizontal: guessWidthSpir * 0.05,
                    }}
                />
            ))}
        </TheViewOfSpirits>
    );
};

export default SpiriGuessPageToNavigateUser;