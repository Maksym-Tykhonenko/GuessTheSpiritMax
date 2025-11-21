const gtsSettingsMatrix = [
    {
        gtsKey: 'melody',
        gtsLabel: Platform.OS === 'android' ? 'Notifications' : 'Melody',
        gtsStorage: 'spirit_melody_enabled',
    },
    {
        gtsKey: 'vibration',
        gtsLabel: 'Vibration',
        gtsStorage: 'spirit_vibration_enabled',
    },
];
import { guessTheFontSpirit as guessMotFont } from '../guessTheFontSpirit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Dimensions as GuessMotDimensions,
    Text as GueSpirssText,
    TouchableOpacity as SpiritPressable,
    View as GueSpirssView,
    Platform,
} from 'react-native';


const TSGSettingsOfSpiritGess: React.FC<{
    gSoSpiround: boolean;
    setGSoSpiround: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ gSoSpiround, setGSoSpiround }) => {
    const [gueSpirssState, setGueSpirssState] = useState<{ melody: boolean; vibration: boolean }>({
        melody: gSoSpiround,
        vibration: false,
    });
    const { width: gtsWidth, height: gtsHeight } = GuessMotDimensions.get('window');

    useEffect(() => {
        (async () => {
            const loadedGueSpirss: any = {};
            for (const gtsSett of gtsSettingsMatrix) {
                const valGueSpirss = await AsyncStorage.getItem(gtsSett.gtsStorage);
                loadedGueSpirss[gtsSett.gtsKey] = valGueSpirss === 'true';
            }
            setGueSpirssState((prevGueSpirss) => ({
                melody: loadedGueSpirss.melody ?? prevGueSpirss.melody,
                vibration: loadedGueSpirss.vibration ?? prevGueSpirss.vibration,
            }));
            setGSoSpiround(loadedGueSpirss.melody ?? gSoSpiround);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGueSpirssToggle = async (gtsKey: 'melody' | 'vibration', gtsValue: boolean) => {
        setGueSpirssState((prevGueSpirss) => ({ ...prevGueSpirss, [gtsKey]: gtsValue }));
        await AsyncStorage.setItem(
            gtsSettingsMatrix.find((gtsSett) => gtsSett.gtsKey === gtsKey)!.gtsStorage,
            gtsValue.toString()
        );
        if (gtsKey === 'melody') setGSoSpiround(gtsValue);
    };

    const guessMotBlockRadius = gtsWidth * 0.06;
    const guessMotBlockHeight = gtsHeight * 0.1;
    const guessMotSwitchSize = gtsWidth * 0.13;
    const guessMotBlockMargin = gtsHeight * 0.03;

    return (
        <GueSpirssView
            style={{
                width: gtsWidth * 0.93,
                flex: 1,
                alignSelf: 'center',
                height: gtsHeight,
            }}
        >
            {gtsSettingsMatrix.map(({ gtsKey, gtsLabel }) => (
                <GueSpirssView
                    key={gtsKey}
                    style={{
                        backgroundColor: 'rgba(61, 20, 124, 1)',
                        alignItems: 'center',
                        paddingHorizontal: gtsWidth * 0.06,
                        justifyContent: 'space-between',
                        borderRadius: guessMotBlockRadius,
                        flexDirection: 'row',
                        marginBottom: guessMotBlockMargin,
                        height: guessMotBlockHeight,
                    }}
                >
                    <GueSpirssText
                        style={{
                            fontSize: gtsWidth * 0.052,
                            color: '#fff',
                            fontFamily: guessMotFont.guessMotSemiBol,
                        }}
                        allowFontScaling
                    >
                        {gtsLabel}
                    </GueSpirssText>
                    <GueSpirssView style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {[
                            {
                                btnPress: () => handleGueSpirssToggle(gtsKey, false),
                                btnBg: !gueSpirssState[gtsKey] ? '#940B0B' : 'rgba(148, 11, 11, 0.25)',
                                btnMargin: gtsWidth * 0.04,
                                btnTextColor: !gueSpirssState[gtsKey] ? '#fff' : 'transparent',
                                btnText: 'OFF',
                                btnRadius: guessMotSwitchSize * 0.18,
                                btnVal: false,
                            },
                            {
                                btnPress: () => handleGueSpirssToggle(gtsKey, true),
                                btnVal: true,
                                btnMargin: 0,
                                btnTextColor: gueSpirssState[gtsKey] ? '#222' : 'transparent',
                                btnText: 'ON',
                                btnRadius: guessMotSwitchSize * 0.25,
                                btnBg: gueSpirssState[gtsKey] ? '#24E224' : 'rgba(36, 226, 36, 0.25)',
                            },
                        ].map((btnObj) => (
                            <SpiritPressable
                                onPress={btnObj.btnPress}
                                activeOpacity={0.7}
                                key={btnObj.btnText}
                                style={{
                                    borderRadius: btnObj.btnRadius,
                                    height: guessMotSwitchSize,
                                    marginRight: btnObj.btnMargin,
                                    backgroundColor: btnObj.btnBg,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: guessMotSwitchSize,
                                }}
                            >
                                <GueSpirssText
                                    style={{
                                        fontFamily: guessMotFont.guessMotSemiBol,
                                        fontSize: gtsWidth * 0.045,
                                        color: btnObj.btnTextColor,
                                    }}
                                >
                                    {btnObj.btnText}
                                </GueSpirssText>
                            </SpiritPressable>
                        ))}
                    </GueSpirssView>
                </GueSpirssView>
            ))}
        </GueSpirssView>
    );
};

export default TSGSettingsOfSpiritGess;