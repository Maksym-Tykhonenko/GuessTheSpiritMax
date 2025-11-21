import React, { useState } from 'react';
import {
    Image as GTImageSpir,
    View as GTViewSpir,
    Dimensions as GTDimensionsSpir,
    Text as GTTextSpir,
    Share as GTShareSpir,
} from 'react-native';

import { SpiritGradientButton as GTGradientButtonSpir } from '../GuessTheSpiritComponents/SpiritGradientButton';
import { guessTheFontSpirit as guessTheFontSpir } from '../guessTheFontSpirit';
import { ScrollView } from 'react-native-gesture-handler';

interface GTSpiriGuessPageToNavigateUserProps {
    pgOfGuessScreenSpt: string;
}

const GTTitleSpir: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { width, height } = GTDimensionsSpir.get('window');
    const sectionSpacing = height * 0.03;
    return (
        <GTTextSpir
            style={{
                fontSize: width * 0.053,
                fontFamily: guessTheFontSpir.guessMotSemiBol,
                color: '#fff',
                marginBottom: sectionSpacing * 0.7,
            }}
            allowFontScaling
        >
            {children}
        </GTTextSpir>
    );
};

const GTDescriptionSpir: React.FC<{ children: React.ReactNode; bottomGapOfGuess?: number }> = ({ children, bottomGapOfGuess }) => {
    const { width } = GTDimensionsSpir.get('window');
    return (
        <GTTextSpir
            style={{
                fontFamily: guessTheFontSpir.guessMotRegu,
                fontSize: width * 0.035,
                marginBottom: bottomGapOfGuess,
                color: '#fff',
            }}
            allowFontScaling
        >
            {children}
        </GTTextSpir>
    );
};

const gtSectionsSpir = [
    {
        gtSectionTitleSpir: 'Goal of the game',
        gtDescriptionsOfSectionSpir: `Feel the spirit of the company!
Your task is to show an emotion or state, and the other players have to guess what exactly you are depicting.
The one who guessed first becomes the next “Spirit”.`,
        bottomGapOfGuess: 1.2,
    },
    {
        gtSectionTitleSpir: 'How to play',
        gtDescriptionsOfSectionSpir: `Add players - minimum 2, maximum 10.
Click “Start game”.
The name of the person who goes first will appear on the screen - pass the phone to this player.
You have 5 seconds so that no one else can see.`,
        bottomGapOfGuess: 1.2,
    },
    {
        gtSectionTitleSpir: 'How to play',
        gtDescriptionsOfSectionSpir: `Add players - minimum 2, maximum 10.
Click “Start game”.
The name of the person who goes first will appear on the screen - pass the phone to this player.
You have 5 seconds so that no one else can see.

The player is shown a secret task - what emotion or state to play.
After clicking “OK”, the task disappears - and the player starts the show.
The other players watch carefully and try to guess the emotion.
When someone is sure - the player who guessed is chosen.
The one who guessed correctly becomes the next Spirit.
The game continues in a circle until everyone has played.`,
        bottomGapOfGuess: 0.5,
    },
];

const TheRulesOfSpirGuet: React.FC<GTSpiriGuessPageToNavigateUserProps> = ({ pgOfGuessScreenSpt }) => {
    const { width: gtWidthSpir, height: gtHeightSpir } = GTDimensionsSpir.get('window');
    const gtSectionSpacingSpir = gtHeightSpir * 0.03;

    return (
        <GTViewSpir
            style={{
                flex: 1,
                width: '100%', // змінено з gtWidthSpir * 0.93
                // alignSelf: 'center', // видалено
            }}
        >
            <ScrollView
                scrollEnabled={pgOfGuessScreenSpt === 'Spiri Guess Rules of App'}
                showsVerticalScrollIndicator={false}
                // style={{flex: 1}} // видалено
                contentContainerStyle={{
                    paddingBottom: gtHeightSpir * 0.160234,
                    paddingHorizontal: gtWidthSpir * 0.035, // додано для відступів з боків
                    width: gtWidthSpir * 0.93, // ширина контенту як раніше
                    alignSelf: 'center', // центрування контенту
                }}
            >
                {pgOfGuessScreenSpt === 'Spiri Guess Rules of App' ? (

                    gtSectionsSpir.map((section, idx) => (
                        <React.Fragment key={idx}>
                            <GTTitleSpir>
                                {section.gtSectionTitleSpir}
                            </GTTitleSpir>
                            <GTDescriptionSpir bottomGapOfGuess={gtSectionSpacingSpir * section.bottomGapOfGuess}>
                                {section.gtDescriptionsOfSectionSpir}
                            </GTDescriptionSpir>
                        </React.Fragment>
                    ))


                ) : (
                    <>
                        <GTViewSpir
                            style={{
                                width: '100%',
                                marginTop: gtHeightSpir * 0.07,
                            }}
                        >
                            <GTImageSpir
                                source={require('../GuessTheSpiritAssets/GuessTheSpiritImages/spiriSmallGuess.png')}
                                style={{
                                    width: gtWidthSpir * 0.38,
                                    borderRadius: gtWidthSpir * 0.09,
                                    marginBottom: gtHeightSpir * 0.04,
                                    alignSelf: 'flex-start',
                                    height: gtWidthSpir * 0.38,
                                }}
                                resizeMode="contain"
                            />
                            <GTTextSpir
                                style={{
                                    fontSize: gtWidthSpir * 0.052,
                                    alignSelf: 'flex-start',
                                    color: '#fff',
                                    marginBottom: gtHeightSpir * 0.018,
                                    fontFamily: guessTheFontSpir.guessMotSemiBol,
                                }}
                                allowFontScaling
                            >
                                ABOUT APP
                            </GTTextSpir>
                            <GTTextSpir
                                style={{
                                    marginBottom: gtHeightSpir * 0.04,
                                    fontSize: gtWidthSpir * 0.038,
                                    lineHeight: gtWidthSpir * 0.052,
                                    alignSelf: 'flex-start',
                                    color: '#fff',
                                    fontFamily: guessTheFontSpir.guessMotRegu,
                                }}
                                allowFontScaling
                            >
                                Guess the Spirit is a game for a company, where everyone shows an emotion, and the others have to guess what it is they are depicting.
                                {'\n'}Hand over the phone, get your secret task and release your spirit onto the stage!
                                {'\n'}Fun, simple and without spoilers - everything is decided by intuition and a sense of the moment.
                            </GTTextSpir>
                            <GTGradientButtonSpir
                                textStyle={{
                                    fontSize: gtWidthSpir * 0.044,
                                }}
                                onPress={() => {
                                    GTShareSpir.share({
                                        message: "Play Guess the Spirit with friends! Pass the phone, act out emotions, and see who can guess the fastest!"
                                    })
                                }}
                                variant='secondary'
                                arrow={false}
                                style={{
                                    alignSelf: 'flex-start',
                                }}
                                label="Share app"
                            />
                        </GTViewSpir>
                    </>
                )}
            </ScrollView>
        </GTViewSpir>
    );
};

export default TheRulesOfSpirGuet;