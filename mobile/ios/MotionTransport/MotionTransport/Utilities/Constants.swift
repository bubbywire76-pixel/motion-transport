import SwiftUI

struct MotionColors {
    static let emeraldGreen = Color(red: 0.11, green: 0.30, blue: 0.24) // #1B4D3E
    static let midnightNavy = Color(red: 0, green: 0.2, blue: 0.4) // #003366
    static let gold = Color(red: 0.83, green: 0.68, blue: 0.22) // #D4AF37
    static let cream = Color(red: 0.96, green: 0.95, blue: 0.91) // #F5F1E8
}

struct MotionTypography {
    static let largeTitle = Font.system(size: 32, weight: .bold, design: .default)
    static let title = Font.system(size: 28, weight: .bold, design: .default)
    static let subtitle = Font.system(size: 16, weight: .semibold, design: .default)
    static let body = Font.system(size: 14, weight: .regular, design: .default)
    static let caption = Font.system(size: 12, weight: .regular, design: .default)
}

struct APIConstants {
    static let baseURL = "https://api.motionapp.ng"
    static let apiVersion = "v1"
    static let timeout: TimeInterval = 30
}
