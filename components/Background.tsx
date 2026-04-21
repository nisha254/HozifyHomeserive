

import React from 'react';
import { View, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// ── Brand splash colours ──────────────────────────────────────────────────────
const SPLASH = {
    topSky: '#ADE8F4',   // top-left  sky blue
    topLime: '#D9ED92',   // top-right lime
    midWhite: '#FFFFFF',   // centre
    botGreen: '#B5E48C',   // bottom-left green
    botOrange: '#F97316',   // bottom-right orange
};

interface HozifyBackgroundProps {
    children?: React.ReactNode;
    intensity?: number;     // 0–1, vividness of corner colours
    centerWhite?: number;   // 0–1, strength of white centre wash
    style?: ViewStyle;
}

export const HozifyBackground: React.FC<HozifyBackgroundProps> = ({
    children,
    intensity = 1,
    centerWhite = 0.82,
    style,
}) => {
    const op = (base: number) => base * intensity;

    return (
        <View style={[styles.root, style]}>

            {/* ── Base white canvas ── */}
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: SPLASH.midWhite }]} />

            {/* ── Top-left: sky blue ── */}
            <LinearGradient
                colors={[SPLASH.topSky, `${SPLASH.topSky}00`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.corner, styles.cornerTL, { opacity: op(0.80) }]}
            />

            {/* ── Top-right: lime ── */}
            <LinearGradient
                colors={[SPLASH.topLime, `${SPLASH.topLime}00`]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.corner, styles.cornerTR, { opacity: op(0.75) }]}
            />

            {/* ── Bottom-left: green ── */}
            <LinearGradient
                colors={[SPLASH.botGreen, `${SPLASH.botGreen}00`]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={[styles.corner, styles.cornerBL, { opacity: op(0.78) }]}
            />

            {/* ── Bottom-right: orange ── */}
            <LinearGradient
                colors={[SPLASH.botOrange, `${SPLASH.botOrange}00`]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[styles.corner, styles.cornerBR, { opacity: op(0.70) }]}
            />

            {/* ── White centre wash — softens corner blobs into a clean centre ── */}
            <LinearGradient
                colors={[
                    `rgba(255,255,255,0)`,
                    `rgba(255,255,255,${centerWhite})`,
                    `rgba(255,255,255,${centerWhite})`,
                    `rgba(255,255,255,0)`,
                ]}
                locations={[0, 0.28, 0.72, 1]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFillObject}
            />

            {/* horizontal white sweep */}
            <LinearGradient
                colors={[
                    `rgba(255,255,255,0)`,
                    `rgba(255,255,255,${centerWhite * 0.9})`,
                    `rgba(255,255,255,0)`,
                ]}
                locations={[0, 0.5, 1]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFillObject}
            />

            {/* ── Children on top ── */}
            {children}
        </View>
    );
};

const BLOB_W = width * 0.85;
const BLOB_H = height * 0.52;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        overflow: 'hidden',
    },

    corner: {
        position: 'absolute',
        width: BLOB_W,
        height: BLOB_H,
        borderRadius: BLOB_W * 0.55,
    },

    cornerTL: {
        top: -(BLOB_H * 0.22),
        left: -(BLOB_W * 0.20),
    },
    cornerTR: {
        top: -(BLOB_H * 0.22),
        right: -(BLOB_W * 0.20),
    },
    cornerBL: {
        bottom: -(BLOB_H * 0.20),
        left: -(BLOB_W * 0.20),
    },
    cornerBR: {
        bottom: -(BLOB_H * 0.20),
        right: -(BLOB_W * 0.20),
    },
});