$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Force -Path 'public\images\sections'
New-Item -ItemType Directory -Force -Path 'public\images\placeholders'
New-Item -ItemType Directory -Force -Path 'public\images\brand'

$sectionImages = @("about2.png", "contact.png", "hero.png", "hero2.png", "services.png", "services2.png", "testi.png", "work.png")
foreach ($img in $sectionImages) {
    if (Test-Path $img) {
        Move-Item -Path $img -Destination "public\images\sections\$img" -Force
    }
}

$placeholderImages = @("placeholder-user.jpg", "placeholder.jpg", "placeholder-logo.png", "placeholder-logo.svg", "placeholder.svg")
foreach ($img in $placeholderImages) {
    if (Test-Path "public\$img") {
        Move-Item -Path "public\$img" -Destination "public\images\placeholders\$img" -Force
    }
}

if (Test-Path "public\ezyit-logo.jpg") {
    Move-Item -Path "public\ezyit-logo.jpg" -Destination "public\images\brand\ezyit-logo.jpg" -Force
}
