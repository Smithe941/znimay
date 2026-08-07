import type { Lang } from '../i18n/config';

export type TourRoomId = 'room_1' | 'room_2' | 'room_3';

export type TourNodeId = 'room_1_1' | 'room_1_2' | 'room_2' | 'room_3';

/** forward = floor/path arrow; wall = plaque projected on a wall/door */
export type TourLinkKind = 'forward' | 'wall';

export type TourLink = {
  nodeId: TourNodeId;
  kind: TourLinkKind;
  position: { yaw: string; pitch: string };
  name: Record<Lang, string>;
};

export type TourNode = {
  id: TourNodeId;
  room: TourRoomId;
  panorama: string;
  name: Record<Lang, string>;
  links: TourLink[];
};

export const tourRooms: {
  id: TourRoomId;
  startNodeId: TourNodeId;
  label: Record<Lang, string>;
  /** Still preview for Locations tab */
  preview: string;
  blurb: Record<Lang, string>;
}[] = [
  {
    id: 'room_1',
    startNodeId: 'room_1_1',
    label: { uk: 'Циклорама', en: 'Cyclorama' },
    preview: 'room_1_1.jpg',
    blurb: {
      uk: 'Біле поле без горизонту — контрольоване світло, глибока тінь, чистий кадр.',
      en: 'A white field without a horizon — controlled light, deep shadow, a clean frame.',
    },
  },
  {
    id: 'room_2',
    startNodeId: 'room_2',
    label: { uk: 'Зона 2', en: 'Zone 2' },
    preview: 'room_2.jpg',
    blurb: {
      uk: 'Тихіший кут простору — для кадрів, яким потрібна близькість.',
      en: 'A quieter corner of the space — for frames that need closeness.',
    },
  },
  {
    id: 'room_3',
    startNodeId: 'room_3',
    label: { uk: 'Зона 3', en: 'Zone 3' },
    preview: 'room_3.jpg',
    blurb: {
      uk: 'Інший ритм у тій самій студії — змінюєш зону, змінюєш настрій.',
      en: 'Another rhythm in the same studio — change the zone, change the mood.',
    },
  },
];

/**
 * Graph:
 * room_1_1 ↔ room_1_2  (forward arrows)
 * room_1_* → room_2, room_3  (wall plaques)
 * room_2 / room_3 → room_1_1  (wall plaques)
 */
export const tourNodes: TourNode[] = [
  {
    id: 'room_1_1',
    room: 'room_1',
    panorama: 'room_1_1.jpg',
    name: { uk: 'Циклорама · точка 1', en: 'Cyclorama · view 1' },
    links: [
      {
        nodeId: 'room_1_2',
        kind: 'forward',
        position: { yaw: '235deg', pitch: '-8deg' },
        name: { uk: 'Далі по зоні', en: 'Further in the zone' },
      },
      {
        nodeId: 'room_2',
        kind: 'wall',
        // doorway area — mid wall height
        position: { yaw: '-105deg', pitch: '2deg' },
        name: { uk: 'Зона 2', en: 'Zone 2' },
      },
      {
        nodeId: 'room_3',
        kind: 'wall',
        position: { yaw: '140deg', pitch: '2deg' },
        name: { uk: 'Зона 3', en: 'Zone 3' },
      },
    ],
  },
  {
    id: 'room_1_2',
    room: 'room_1',
    panorama: 'room_1_2.jpg',
    name: { uk: 'Циклорама · точка 2', en: 'Cyclorama · view 2' },
    links: [
      {
        nodeId: 'room_1_1',
        kind: 'forward',
        position: { yaw: '130deg', pitch: '-8deg' },
        name: { uk: 'Назад по зоні', en: 'Back in the zone' },
      },
      {
        nodeId: 'room_2',
        kind: 'wall',
        position: { yaw: '-125deg', pitch: '2deg' },
        name: { uk: 'Зона 2', en: 'Zone 2' },
      },
      {
        nodeId: 'room_3',
        kind: 'wall',
        position: { yaw: '100deg', pitch: '2deg' },
        name: { uk: 'Зона 3', en: 'Zone 3' },
      },
    ],
  },
  {
    id: 'room_2',
    room: 'room_2',
    panorama: 'room_2.jpg',
    name: { uk: 'Зона 2', en: 'Zone 2' },
    links: [
      {
        nodeId: 'room_1_1',
        kind: 'wall',
        position: { yaw: '75deg', pitch: '2deg' },
        name: { uk: 'Циклорама', en: 'Cyclorama' },
      },
    ],
  },
  {
    id: 'room_3',
    room: 'room_3',
    panorama: 'room_3.jpg',
    name: { uk: 'Зона 3', en: 'Zone 3' },
    links: [
      {
        nodeId: 'room_1_1',
        kind: 'wall',
        position: { yaw: '35deg', pitch: '2deg' },
        name: { uk: 'Циклорама', en: 'Cyclorama' },
      },
    ],
  },
];
