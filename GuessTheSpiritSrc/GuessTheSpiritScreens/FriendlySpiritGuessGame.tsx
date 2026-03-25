import { guessTheFontSpirit as guessMotFont } from '../guessTheFontSpirit';
import whichEmotionToShow from '../SprtDataTheGess/whichEmotionToShow';
import {
    TextInput,
    Text as TPGTextSpirThe,
    TouchableOpacity as TheTOpaciSpiriTG,
    View as GuessTheBoxOfSpt,
    Image as PTGImgOf,
    Dimensions as GuessMotDimensions,
    Share,
} from 'react-native';
import { SpiritGradientButton } from '../GuessTheSpiritComponents/SpiritGradientButton';
import React, { useEffect as useSPGEffect, useState as useTheSprtState, useRef } from 'react';


const minPlayers = 2;
const maxPlayers = 10;

const FriendlySpiritGuessGame: React.FC = () => {
    const { width: gtsWidth, height: gtsHeight } = GuessMotDimensions.get('window');

    // Game states
    const [screen, setScreen] = useTheSprtState<'add' | 'warn' | 'play' | 'choose' | 'result'>('add');
    const [winnerIdx, setWinnerIdx] = useTheSprtState<number | null>(null);
    const [round, setRound] = useTheSprtState(0);
    const [currentIdx, setCurrentIdx] = useTheSprtState(0);
    const [emotion, setEmotion] = useTheSprtState<string>('');
    const [timer, setTimer] = useTheSprtState(10);
    const [players, setPlayers] = useTheSprtState<string[]>(['', '']);
    const [scores, setScores] = useTheSprtState<number[]>([0, 0]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Add/remove player handlers
    const handleAddPlayer = () => {
        if (players.length < maxPlayers) {
            setPlayers([...players, '']);
            setScores([...scores, 0]);
        }
    };
    const handleRemovePlayer = (idx: number) => {
        if (players.length > minPlayers) {
            const newPlayers = players.filter((_, i) => i !== idx);
            const newScores = scores.filter((_, i) => i !== idx);
            setPlayers(newPlayers);
            setScores(newScores);
        }
    };
    const handleChangePlayer = (idx: number, name: string) => {
        const newPlayers = [...players];
        newPlayers[idx] = name;
        setPlayers(newPlayers);
    };

    // Timer for emotion reveal
    useSPGEffect(() => {
        if (screen === 'warn' && timer > 0) {
            timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        }
        // Автоматичний перехід видалено!
        if (screen === 'play' && timer > 0) {
            timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [screen, timer]);

    // Choose winner → Next round or result
    const handleChooseWinner = (idx: number) => {
        setWinnerIdx(idx);
    };
    // Вибір переможця: winnerIdx — це індекс у відфільтрованому списку, треба знайти справжній індекс
    const handleConfirmWinner = () => {
        if (winnerIdx !== null) {
            // Знаходимо справжній індекс гравця у масиві players
            const filteredPlayers = players.filter((_, idx) => idx !== currentIdx);
            const winnerName = filteredPlayers[winnerIdx];
            const realWinnerIdx = players.findIndex(name => name === winnerName);

            const newScores = [...scores];
            if (realWinnerIdx !== -1) {
                newScores[realWinnerIdx] += 1;
            }
            setScores(newScores);

            if (round + 1 < players.length) {
                setCurrentIdx(round + 1);
                setRound(round + 1);
                setScreen('warn');
                setTimer(10);
            } else {
                setScreen('result');
            }
            setWinnerIdx(null);
        }
    };

    // New game
    const handleNewGame = () => {
        setScreen('add');
        setPlayers(['', '']);
        setScores([0, 0]);
        setCurrentIdx(0);
        setRound(0);
    };

    // UI
    return (
        <GuessTheBoxOfSpt style={{
            height: gtsHeight,
            alignSelf: 'center',
            flex: 1,
            width: gtsWidth * 0.93,
        }}>
            {/* Add Players Screen */}
            {screen === 'add' && (
                <GuessTheBoxOfSpt>
                    <TPGTextSpirThe style={{
                        marginVertical: gtsHeight * 0.0190354,
                        fontFamily: guessMotFont.guessMotRegu,
                        color: '#aaa',
                        textAlign: 'center',
                        fontSize: gtsWidth * 0.035,
                    }}>
                        Please provide the names of participants, minimum 2 - maximum 10
                    </TPGTextSpirThe>
                    {players.map((name, idx) => (
                        <GuessTheBoxOfSpt key={idx} style={{
                            paddingHorizontal: gtsWidth * 0.04,
                            height: gtsHeight * 0.07,
                            backgroundColor: '#3d1e6d',
                            borderRadius: gtsWidth * 0.04,
                            marginVertical: gtsHeight * 0.01,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <TextInput
                                style={{
                                    color: '#fff',
                                    fontSize: gtsWidth * 0.045,
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                }}
                                value={name}
                                placeholderTextColor="#aaa"
                                onChangeText={text => handleChangePlayer(idx, text)}
                                placeholder={`Player ${idx + 1}`}
                            />
                            {players.length > minPlayers && (
                                <TheTOpaciSpiriTG
                                    onPress={() => handleRemovePlayer(idx)}
                                    style={{
                                        alignItems: 'center',
                                        marginLeft: gtsWidth * 0.02,
                                        width: gtsWidth * 0.09,
                                        backgroundColor: '#6c3fd1',
                                        height: gtsWidth * 0.09,
                                        justifyContent: 'center',
                                        borderRadius: gtsWidth * 0.02,
                                    }}
                                >
                                    <TPGTextSpirThe style={{ color: '#fff', fontSize: gtsWidth * 0.06 }}>
                                        −
                                    </TPGTextSpirThe>
                                </TheTOpaciSpiriTG>
                            )}
                            {idx === players.length - 1 && players.length < maxPlayers && (
                                <TheTOpaciSpiriTG
                                    onPress={handleAddPlayer}
                                    style={{
                                        alignItems: 'center',
                                        borderRadius: gtsWidth * 0.02,
                                        marginLeft: gtsWidth * 0.02,
                                        width: gtsWidth * 0.09,
                                        justifyContent: 'center',
                                        height: gtsWidth * 0.09,
                                        backgroundColor: '#6c3fd1',
                                    }}
                                >
                                    <TPGTextSpirThe style={{ color: '#fff', fontSize: gtsWidth * 0.06 }}>
                                        +
                                    </TPGTextSpirThe>
                                </TheTOpaciSpiriTG>
                            )}
                        </GuessTheBoxOfSpt>
                    ))}
                    {/* Start Game button */}
                    <SpiritGradientButton
                        textStyle={{
                            fontSize: gtsWidth * 0.044,
                        }}
                        onPress={() => {
                            console.log('Start Game Pressed');
                            if (players.length >= minPlayers && players.every(p => p.trim())) {
                                setScreen('warn');
                                setCurrentIdx(0);
                                setRound(0);
                                setScores(Array(players.length).fill(0));
                            }
                        }}
                        variant='secondary'
                        arrow={true}
                        style={{
                            marginTop: gtsHeight * 0.019,
                        }}
                        label="Start Game"
                    />
                </GuessTheBoxOfSpt>
            )}

            {/* Warn Screen */}
            {screen === 'warn' && (
                <GuessTheBoxOfSpt style={{ alignItems: 'center', flex: 1 }}>
                    <TPGTextSpirThe style={{
                        marginBottom: gtsHeight * 0.02,
                        fontFamily: guessMotFont.guessMotSemiBol,
                        fontSize: gtsWidth * 0.06,
                        color: '#fff',
                    }}>
                        Currently playing:
                    </TPGTextSpirThe>
                    <TPGTextSpirThe style={{
                        backgroundColor: '#FA4730',
                        marginBottom: gtsHeight * 0.04,
                        fontFamily: guessMotFont.guessMotSemiBol,
                        borderRadius: gtsWidth * 0.03,
                        fontSize: gtsWidth * 0.055,
                        paddingVertical: gtsHeight * 0.016,
                        paddingHorizontal: gtsWidth * 0.08,
                        color: '#fff',
                    }}>
                        {players[currentIdx]}
                    </TPGTextSpirThe>

                    <GuessTheBoxOfSpt style={{
                        borderRadius: gtsWidth * 0.03,
                        width: gtsWidth * 0.84,
                        alignItems: 'center',
                        backgroundColor: '#3D147C',
                        padding: gtsWidth * 0.05,
                        paddingVertical: gtsHeight * 0.035, justifyContent: 'center',
                    }}>
                        <GuessTheBoxOfSpt style={{
                            alignItems: 'center',
                            justifyContent: 'center', flexDirection: 'row', gap: gtsWidth * 0.016
                        }}>
                            <PTGImgOf
                                source={require('../GuessTheSpiritAssets/GuessTheSpiritImages/timeLeftForGuessing.png')}
                                style={{
                                    height: gtsHeight * 0.05,
                                    resizeMode: 'contain',
                                    width: gtsHeight * 0.05,
                                }}
                            />
                            <TPGTextSpirThe style={{
                                fontFamily: guessMotFont.guessMotSemiBol,
                                color: '#fff',
                                fontSize: gtsWidth * 0.084,
                            }}>
                                {`0:${timer < 10 ? '0' : ''}${timer}`}
                            </TPGTextSpirThe>
                        </GuessTheBoxOfSpt>

                        <TPGTextSpirThe style={{
                            fontFamily: guessMotFont.guessMotSemiBol,
                            fontSize: gtsWidth * 0.06,
                            textAlign: 'center',
                            marginTop: gtsHeight * 0.025,
                            color: '#fff',

                        }}>
                            Show that you are incredibly happy!
                        </TPGTextSpirThe>
                    </GuessTheBoxOfSpt>

                    <SpiritGradientButton
                        textStyle={{
                            fontSize: gtsWidth * 0.05,
                            color: '#220D42'
                        }}
                        onPress={() => {
                            setScreen('choose');
                            setTimer(10);
                        }}
                        variant='primary'
                        arrow={false}
                        style={{
                            height: gtsHeight * 0.1,
                            borderRadius: gtsWidth * 0.05,
                            width: gtsWidth * 0.59,
                            position: 'absolute',
                            bottom: gtsHeight * 0.16,
                        }}
                        label="OK, ready!"
                    />

                </GuessTheBoxOfSpt>
            )}

            {/* Choose Winner Screen */}
            {screen === 'choose' && (
                <GuessTheBoxOfSpt style={{
                    paddingHorizontal: gtsWidth * 0.04,
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <TPGTextSpirThe style={{
                        fontFamily: guessMotFont.guessMotSemiBol,
                        textAlign: 'center',
                        fontSize: gtsWidth * 0.07,
                        color: '#fff',
                        marginBottom: gtsHeight * 0.04,
                        fontWeight: 'bold',
                    }}>
                        Choose who guessed{'\n'}the emotion:
                    </TPGTextSpirThe>
                    {players.filter((_, idx) => idx !== currentIdx).map((name, idx) => (
                        <TheTOpaciSpiriTG
                            key={idx}
                            onPress={() => handleChooseWinner(idx)}
                            style={{
                                paddingHorizontal: gtsWidth * 0.06,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#3D147C',
                                flexDirection: 'row',
                                height: gtsHeight * 0.091,
                                borderRadius: gtsWidth * 0.04,
                                marginBottom: gtsHeight * 0.025,
                                width: gtsWidth * 0.85,
                            }}
                        >
                            <TPGTextSpirThe style={{
                                color: '#fff',
                                fontSize: gtsWidth * 0.05,
                                fontFamily: guessMotFont.guessMotSemiBol,
                            }}>
                                {name}
                            </TPGTextSpirThe>
                            <GuessTheBoxOfSpt style={{
                                justifyContent: 'center',
                                backgroundColor: '#6c3fd1',
                                borderRadius: gtsWidth * 0.016,
                                width: gtsHeight * 0.04,
                                alignItems: 'center',
                                height: gtsHeight * 0.04,
                            }}>
                                {winnerIdx === idx && (
                                    <GuessTheBoxOfSpt style={{
                                        backgroundColor: '#fff',
                                        height: gtsHeight * 0.017,
                                        borderRadius: gtsWidth * 0.0225,
                                        width: gtsHeight * 0.017,
                                    }} />
                                )}
                            </GuessTheBoxOfSpt>
                        </TheTOpaciSpiriTG>
                    ))}
                    <SpiritGradientButton
                        style={{
                            marginTop: gtsHeight * 0.06,
                            width: gtsWidth * 0.7,
                            height: gtsHeight * 0.09,
                            borderRadius: gtsWidth * 0.04,
                            alignSelf: 'center',
                            position: 'absolute',
                            bottom: gtsHeight * 0.16,
                        }}
                        textStyle={{
                            fontSize: gtsWidth * 0.05,
                            color: '#220D42',
                            fontWeight: 'bold',
                        }}
                        arrow={false}
                        variant='primary'
                        disabled={winnerIdx === null}
                        label="Next player"
                        onPress={handleConfirmWinner}
                    />
                    <TheTOpaciSpiriTG
                        onPress={handleNewGame}
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            bottom: gtsHeight * 0.04,
                            position: 'absolute',
                            backgroundColor: '#6F24E2',
                            paddingHorizontal: gtsWidth * 0.07,
                            alignSelf: 'center',
                            paddingVertical: gtsHeight * 0.017,
                            borderRadius: gtsWidth * 0.03,
                        }}
                    >
                        <PTGImgOf
                            source={require('../GuessTheSpiritAssets/GuessTheSpiritImages/exitSgame.png')}
                            style={{
                                marginRight: gtsWidth * 0.019,
                                height: gtsHeight * 0.025,
                                resizeMode: 'contain',
                                width: gtsHeight * 0.025,
                            }}
                        />
                        <TPGTextSpirThe style={{
                            fontFamily: guessMotFont.guessMotSemiBol,
                            color: '#fff',
                            fontSize: gtsWidth * 0.04,
                        }}>
                            Exit game
                        </TPGTextSpirThe>
                    </TheTOpaciSpiriTG>
                </GuessTheBoxOfSpt>
            )}

            {/* Result Screen */}
            {screen === 'result' && (
                <GuessTheBoxOfSpt style={{ alignItems: 'center', flex: 1 }}>
                    <GuessTheBoxOfSpt style={{
                        marginBottom: gtsHeight * 0.04,
                        borderRadius: gtsWidth * 0.05,
                        alignSelf: 'center',
                        padding: gtsWidth * 0.06,
                        width: gtsWidth * 0.95,
                        backgroundColor: '#FA4730',
                    }}>
                        <TPGTextSpirThe style={{
                            fontFamily: guessMotFont.guessMotSemiBol,
                            textAlign: 'center',
                            fontSize: gtsWidth * 0.06,
                            color: '#fff',
                        }} numberOfLines={1} adjustsFontSizeToFit>
                            {players[scores.indexOf(Math.max(...scores))].toUpperCase()} — Soul of the Party!
                        </TPGTextSpirThe>
                    </GuessTheBoxOfSpt>
                    {players.map((name, idx) => (
                        <GuessTheBoxOfSpt key={idx} style={{
                            justifyContent: 'space-between',
                            borderWidth: idx === scores.indexOf(Math.max(...scores)) ? 2 : 0,
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginVertical: gtsHeight * 0.01,
                            paddingHorizontal: gtsWidth * 0.04,
                            height: gtsHeight * 0.07,
                            width: gtsWidth * 0.88,
                            borderRadius: gtsWidth * 0.04,
                            borderColor: idx === scores.indexOf(Math.max(...scores)) ? '#FA4730' : 'transparent',
                            backgroundColor: idx === scores.indexOf(Math.max(...scores)) ? '#1e0e3d' : '#3d1e6d',
                        }}>
                            <TPGTextSpirThe style={{
                                color: '#fff',
                                fontSize: gtsWidth * 0.045,
                            }}>
                                {name}
                            </TPGTextSpirThe>
                            <GuessTheBoxOfSpt style={{
                                paddingHorizontal: gtsWidth * 0.03,
                                paddingVertical: gtsHeight * 0.01,
                                borderRadius: gtsWidth * 0.02,
                                backgroundColor: idx === scores.indexOf(Math.max(...scores)) ? '#FA4730' : '#6c3fd1',
                            }}>
                                <TPGTextSpirThe style={{ color: '#fff', fontSize: gtsWidth * 0.04 }}>
                                    {scores[idx]} point{scores[idx] !== 1 ? 's' : ''}
                                </TPGTextSpirThe>
                            </GuessTheBoxOfSpt>
                        </GuessTheBoxOfSpt>
                    ))}

                    <GuessTheBoxOfSpt style={{
                        borderTopRightRadius: gtsWidth * 0.07,
                        position: 'absolute',
                        bottom: 0,
                        borderTopLeftRadius: gtsWidth * 0.07,
                        justifyContent: 'center',
                        height: gtsHeight * 0.35,
                        alignItems: 'center',
                        width: gtsWidth,
                        backgroundColor: '#220D42',
                    }}>

                        <SpiritGradientButton
                            arrow={false}
                            variant='primary'
                            onPress={handleNewGame}
                            style={{
                                borderRadius: gtsWidth * 0.05,
                                height: gtsHeight * 0.1,
                                width: gtsWidth * 0.59,
                            }}
                            label="Start New Game"
                            textStyle={{
                                fontSize: gtsWidth * 0.05,
                                color: '#220D42'
                            }}
                            />

                        <SpiritGradientButton
                            textStyle={{
                                fontSize: gtsWidth * 0.05,
                            }}
                            onPress={() => {
                                Share.share({
                                    message: `We just played "Guess the Emotion"!\n\nThe Soul of the Party is ${players[scores.indexOf(Math.max(...scores))]} with ${Math.max(...scores)} point${Math.max(...scores) !== 1 ? 's' : ''}!\n\nJoin us for the next round of fun! 🎉🕺💃`
                                })
                            }}
                            variant='secondary'
                            arrow={false}
                            style={{
                                // borderRadius: gtsWidth * 0.05,
                                height: gtsHeight * 0.071,
                                marginTop: gtsHeight * 0.025,
                                width: gtsWidth * 0.4,
                            }}
                            label="Share results"
                        />
                    </GuessTheBoxOfSpt>

                </GuessTheBoxOfSpt>
            )}
        </GuessTheBoxOfSpt>
    );
};

export default FriendlySpiritGuessGame;