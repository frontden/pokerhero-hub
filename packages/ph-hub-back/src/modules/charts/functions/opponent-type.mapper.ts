import { OpponentType } from '@ph-hub/common';
import { OpponentTypeEntityEntity } from '../../database/entities/opponent-type.entity';

export function mapToOpponentType(
  opponentType: OpponentTypeEntityEntity,
): OpponentType {
  return {
    id: opponentType.id,
    title: opponentType.title,
    color: opponentType.color,
    icon: opponentType.icon,
    isDefault: opponentType.isDefault,
  };
}
